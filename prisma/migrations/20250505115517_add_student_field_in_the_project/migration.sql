-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
