export type Admin = {
    admin_id: string;
    name: string;
    passwordHash: string;
  };
  
  export type Student = {
    student_id: string;
    name: string;
    passwordHash: string;
    email: string;
    phone: string;
    address: string;
    prog_id: string;
    prog_name: string;
  };
  
  export type Project = {
    id: string;
    title: string;
    description: string;
    student_id: string;
    category: string;
    admin_id: string;
    report_url?: string | null;
    grade: string;
    created_at: Date;
    updated_at: Date;
  };
  
  export type Request = {
    id: string;
    student_id: string;
    project_id: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  };
  
  export type RequestStatus = 'pending' | 'approved' | 'rejected';