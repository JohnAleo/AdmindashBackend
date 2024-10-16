const Motor = require("../models/motor.model")
const AddNewMotor=(req,res) =>{
    try {
        const {
               name,
               cost,
               company,
               license,
               location,
               people,
               type, 
               date} = req.body;
        const newMotor= new Motor ({
            name,
            cost,
            company,
            license,
            location,
            people,
            type,
            date
        });
        newMotor.save();
        console.log(`Add new name: ${name,cost,company,license,location,people,type,date},
                    Add new Age:${name,cost,company,license,location,people,type,date}`);
        res.status(201).json({message:'Data Received', newMotor}) 
    } catch (error) {
       res.status(400).json({message:'Error Adding Motor', error}) 
    }

}

// Qo'shilgan ma'lumotniyam yangi ro'yxat qilib ko'rsatish uchun quyidagi koddan foydalaniladi 
//va module.exports dan keyin AddNewMotor dan keyin vergul bilan yozib ikkalasini export qilamiz
const GetAllMotorData= async (req,res) => {
    try {
        const motors= await Motor.find();
        res.status(200).json(motors)
    } catch (error) {
        res.status(400).json({
            message:"Error fetching motor ", 
            error})
    }
}

const EditMotor= async (req,res) =>{
    try {
        const {name}=req.params;
        const {
            newName,
            newCost,
            newCompany,
            newLicense,  
            newLocation, 
            newPeople,
            newType, 
            newDate,     
        }=req.body;
        const motor = await Motor.findOne({ name });
        if (motor) {
            motor.name = newName || motor.name;
            motor.cost= newCost || motor.cost;
            motor.company = newCompany || motor.company;
            motor.license= newLicense|| motor.license;
            motor.location= newLocation|| motor.location;
            motor.people= newPeople || motor.people;
            motor.type= newType || motor.type;
            motor.date= newDate || motor.date
            
            await motor.save();
            console.log(
                `Edited name ${name,cost,company,license,location,people,type,date}, to new name: ${motor.name,motor.company,motor.location,motor.cost,motor.type,motor.date,motor.people}` 
            );
            res.status(200).json({message:`Updated Data`, motor});
        } else{
            res.status(404).json({message:`Motor not found`})
        }
    } catch (error) {
        res.status(400).json({message:'Error Editing Motor', error}) 
    }
   
};
 
const DeleteMotor = async (req,res) => {
    try {
        const { name } = req.params;
        const motor = await Motor.findOneAndDelete({ name }); 
        
        if( motor ){
            console.log(`Deleted data ${name}`);
            res.status(200).json({message:`Data deleted`, motor})
        } else{
            res.status(404).json({message:`Motor not found!`})
        }
    } catch (error) {
        res.status(400).json({message:'Error Deleting Motor', error})
    }
    
  
}


module.exports=
{AddNewMotor,
GetAllMotorData,
EditMotor,
DeleteMotor
}