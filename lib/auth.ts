// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma/clients";

export const authOptions = {
  providers: [
    // Admin Login Provider
    CredentialsProvider({
      id: "admin-login",
      name: "Admin",
      credentials: {
        admin_id: { label: "Admin ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.admin_id || !credentials?.password) {
          console.log("Missing admin credentials");
          return null;
        }
        
        const admin = await prisma.admin.findUnique({
          where: { admin_id: credentials.admin_id }
        });

        if (!admin) {
          console.log("Admin not found:", credentials.admin_id);
          return null;
        }

        // Direct plain text comparison
        if (admin.passwordHash !== credentials.password) {
          console.log("Password mismatch for admin:", credentials.admin_id);
          return null;
        }

        return {
          id: admin.admin_id,
          name: admin.name,
          role: "admin"
        };
      }
    }),
    // Student Login Provider
    CredentialsProvider({
      id: "student-login",
      name: "Student",
      credentials: {
        student_id: { label: "Student ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.student_id || !credentials?.password) {
          console.log("Missing student credentials");
          return null;
        }
        
        const student = await prisma.student.findUnique({
          where: { student_id: credentials.student_id }
        });

        if (!student) {
          console.log("Student not found:", credentials.student_id);
          return null;
        }

        // Direct plain text comparison
        if (student.passwordHash !== credentials.password) {
          console.log("Password mismatch for student:", credentials.student_id);
          return null;
        }

        return {
          id: student.student_id,
          name: student.name,
          role: "student"
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      session.user.role = token.role;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/auth/error"
  },
  debug: process.env.NODE_ENV === "development"
};



