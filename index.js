const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/cc12';  


mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    branch: { type: String, required: true },
    registrationnumber: { type: String, required: true }
  });
  
  const Student = mongoose.model('Student', studentSchema);
  



  app.post('/students', async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      console.error(error);  // Log the exact error
      res.status(500).json({ error: "Failed to add student" });
    }
  });
  

app.get('/students', async (req, res) => {
  try {
   
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
});


app.delete('/students/:registrationnumber', async (req, res) => {
    const { registrationnumber } = req.params;
    try {
      const deletedStudent = await Student.findOneAndDelete({ registrationnumber });
      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json({ message: "Student deleted successfully", student: deletedStudent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete student" });
    }
  });
//   app.put('/students/:registrationnumber',async(req,res)=>{
//     const {updatestudent}=req.params;
//     co
//     try {
//         if(!updatestudent){
//             return res.status(404).json({ error: "Student not found" });
//         }
//         const updatestudent=await studentSchema
//     } catch (error) {
        
//     }
//   })

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
