import { Faculty } from "./facultyModel";

const generateFacultyId = async () => {
    let currentId = '0001';
  
    const lastAdmin = await Faculty.findOne({
      role: 'faculty',
    })
      .select({
        id: 1,
        _id: 0,
      })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();
  
    if (lastAdmin) {
      const lastAdminId = lastAdmin.id;
      const lastAdminIdNumber = lastAdminId.slice(2);
  
      const newIdNumber = parseInt(lastAdminIdNumber, 10) + 1;
      currentId = newIdNumber.toString().padStart(4, '0');
    }
  
    return `F-${currentId}`;
  };

  export default generateFacultyId