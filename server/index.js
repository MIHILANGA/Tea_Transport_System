const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const AdminModel = require('./models/Admin');
const FormModel = require('./models/Form');
const FormModel1 = require('./models/Form1');
const FormModel2 = require('./models/Form2');
const FormModel3 = require('./models/Form3');
const LoginModel = require('./models/Logins');
const VehicleModel = require('./models/Vehicle');
const DriverModel = require('./models/Driver');
const MaintainsModel = require('./models/Maintains');



const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:Miyuru4302@miyuruapi.imhpf7h.mongodb.net/TTS?retryWrites=true&w=majority");


require('./models/Form');



app.post("/logins",(req, res) => {
  const {email ,password} = req.body;
  LoginModel.findOne({email: email})
  .then(user=>{
      if(user){
          if(user.password === password){
              res.json("success")
          }else{
              res.json("wrong password")
          }
      }else{
          res.json("wrong email")
      }
  })
})
////////////////////////////////////

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})


app.post('/Alogin',(req, res) => {
    const {email ,password} = req.body;
    AdminModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json("wrong password")
            }
        }else{
            res.json("wrong email")
        }
    })
})

app.post('/Alogin', (req, res) => {
    AdminModel.create(req.body)
    .then(admin => res.json(admin))
    .catch(err => res.json(err))
})


/////////////////////////////////////

app.post('/home', (req, res) => {
    FormModel.create(req.body)
    .then(formd => res.json(formd))
    .catch(err => res.json(err))
})

app.post('/home1', (req, res) => {
  FormModel1.create(req.body)
  .then(formd => res.json(formd))
  .catch(err => res.json(err))
})

app.post('/home2', (req, res) => {
  FormModel2.create(req.body)
  .then(formd => res.json(formd))
  .catch(err => res.json(err))
})

app.post('/home3', (req, res) => {
  FormModel3.create(req.body)
  .then(formd => res.json(formd))
  .catch(err => res.json(err))
})


app.post('/VehicleDetails', (req, res) => {
  VehicleModel.create(req.body)
  .then(formd => res.json(formd))
  .catch(err => res.json(err))
})

app.post('/DriverDetails', (req, res) => {
  DriverModel.create(req.body)
  .then(formd => res.json(formd))
  .catch(err => res.json(err))
})

app.post('/MaintainDetails', (req, res) => {
  MaintainsModel.create(req.body)
  .then(formd => res.json(formd))
  .catch(err => res.json(err))
})
////////////////////////////////////////////////



app.get("/getAllForm", async (req, res) => {
    try {
      const FormData = await FormModel.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  
  app.get("/getAllForm1", async (req, res) => {
    try {
      const FormData = await FormModel1.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  app.get("/getAllForm2", async (req, res) => {
    try {
      const FormData = await FormModel2.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  app.get("/getAllForm3", async (req, res) => {
    try {
      const FormData = await FormModel3.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  app.get("/getAllVehicle", async (req, res) => {
    try {
      const FormData = await VehicleModel.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  app.get("/getAllDriver", async (req, res) => {
    try {
      const FormData = await DriverModel.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  app.get("/getAllMaintain", async (req, res) => {
    try {
      const FormData = await MaintainsModel.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  app.get("/getSetting", async (req, res) => {
    try {
      const FormData = await LoginModel.find({});
      res.send({ status: "ok", data: FormData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
////////////////////////////////////////////////


// Update route
app.post('/updateVehicleDatas', (req, res) => {
  const { id, updatedData } = req.body;
  

  VehicleModel.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: updatedData }, // Update all fields using updatedData
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/deleteVehicleData', (req, res) => {
  const { id } = req.body;

  VehicleModel.findOneAndDelete({ _id: id })
    .then(deletedForm => {
      if (deletedForm) {
        res.json({ message: 'Form data deleted', deletedForm });
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Update route
app.post('/updateDriverDatas', (req, res) => {
  const { id, updatedData } = req.body;
  

  DriverModel.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: updatedData }, // Update all fields using updatedData
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/deleteDriverData', (req, res) => {
  const { id } = req.body;

  DriverModel.findOneAndDelete({ _id: id })
    .then(deletedForm => {
      if (deletedForm) {
        res.json({ message: 'Form data deleted', deletedForm });
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
})

// Update route
app.post('/updateMaintain', (req, res) => {
  const { id, updatedData } = req.body;
  

  MaintainsModel.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: updatedData }, // Update all fields using updatedData
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/deleteMaintain', (req, res) => {
  const { id } = req.body;

  MaintainsModel.findOneAndDelete({ _id: id })
    .then(deletedForm => {
      if (deletedForm) {
        res.json({ message: 'Form data deleted', deletedForm });
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
})

app.post('/updateSetting', (req, res) => {
  const { id, updatedData } = req.body;
  

  LoginModel.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: updatedData }, // Update all fields using updatedData
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});
///////////////////////////////////////////////

  app.post('/updateFormData', (req, res) => {
    const { id, rejectOrConfirm,rejectOrConfirm1 } = req.body;
  
    FormModel.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { rejectOrConfirm: rejectOrConfirm, rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  app.post('/updateRectorData', (req, res) => {
    const { id, rejectOrConfirm1 } = req.body;
  
    FormModel.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
  app.post('/updateAssignData', (req, res) => {
    const { id, driver, vehicle } = req.body;
  
    FormModel.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { driver: driver, vehicle: vehicle } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });


  // Update route
  app.post('/updateFormDatas', (req, res) => {
    const { id, updatedData } = req.body;
    
  
    FormModel.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: updatedData }, // Update all fields using updatedData
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });


  app.post('/deleteFormData', (req, res) => {
    const { id } = req.body;
  
    FormModel.findOneAndDelete({ _id: id })
      .then(deletedForm => {
        if (deletedForm) {
          res.json({ message: 'Form data deleted', deletedForm });
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error deleting form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });


  /////////////////////////////////////////////



  app.post('/updateFormData1', (req, res) => {
    const { id, rejectOrConfirm,rejectOrConfirm1 } = req.body;
  
    FormModel1.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { rejectOrConfirm: rejectOrConfirm, rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  app.post('/updateRectorData1', (req, res) => {
    const { id, rejectOrConfirm1 } = req.body;
  
    FormModel1.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
 
  app.post('/updateAssignData1', (req, res) => {
    const { id, driver, vehicle } = req.body;
  
    FormModel1.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { driver: driver, vehicle: vehicle } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  // Update route
  app.post('/updateFormDatas1', (req, res) => {
    const { id, updatedData } = req.body;
    
  
    FormModel1.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: updatedData }, // Update all fields using updatedData
      { new: true } // Return the updated document
    )
      .then(updatedForm => {
        if (updatedForm) {
          res.json(updatedForm);
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error updating form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });


  app.post('/deleteFormData1', (req, res) => {
    const { id } = req.body;
  
    FormModel1.findOneAndDelete({ _id: id })
      .then(deletedForm => {
        if (deletedForm) {
          res.json({ message: 'Form data deleted', deletedForm });
        } else {
          res.status(404).json({ message: 'Form not found' });
        }
      })
      .catch(err => {
        console.error('Error deleting form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

/////////////////////////////////////////////


app.post('/updateFormData2', (req, res) => {
  const { id, rejectOrConfirm,rejectOrConfirm1 } = req.body;
  
    FormModel2.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { rejectOrConfirm: rejectOrConfirm, rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/updateRectorData2', (req, res) => {
  const { id, rejectOrConfirm1 } = req.body;

  FormModel2.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: { rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/updateAssignData2', (req, res) => {
  const { id, driver, vehicle } = req.body;

  FormModel2.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: { driver: driver, vehicle: vehicle } }, // Update the rejectOrConfirm field
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Update route
app.post('/updateFormDatas2', (req, res) => {
  const { id, updatedData } = req.body;
  

  FormModel2.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: updatedData }, // Update all fields using updatedData
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/deleteFormData2', (req, res) => {
  const { id } = req.body;

  FormModel2.findOneAndDelete({ _id: id })
    .then(deletedForm => {
      if (deletedForm) {
        res.json({ message: 'Form data deleted', deletedForm });
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


/////////////////////////////////////////////


app.post('/updateFormData3', (req, res) => {
  const { id, rejectOrConfirm,rejectOrConfirm1 } = req.body;
  
    FormModel3.findOneAndUpdate(
      { _id: id }, // Match the document by ID
      { $set: { rejectOrConfirm: rejectOrConfirm, rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
      { new: true } // Return the updated document
    )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/updateRectorData3', (req, res) => {
  const { id, rejectOrConfirm1 } = req.body;

  FormModel3.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: { rejectOrConfirm1: rejectOrConfirm1 } }, // Update the rejectOrConfirm field
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/updateAssignData3', (req, res) => {
  const { id, driver, vehicle } = req.body;

  FormModel3.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: { driver: driver, vehicle: vehicle } }, // Update the rejectOrConfirm field
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Update route
app.post('/updateFormDatas3', (req, res) => {
  const { id, updatedData } = req.body;
  

  FormModel3.findOneAndUpdate(
    { _id: id }, // Match the document by ID
    { $set: updatedData }, // Update all fields using updatedData
    { new: true } // Return the updated document
  )
    .then(updatedForm => {
      if (updatedForm) {
        res.json(updatedForm);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error updating form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/deleteFormData3', (req, res) => {
  const { id } = req.body;

  FormModel3.findOneAndDelete({ _id: id })
    .then(deletedForm => {
      if (deletedForm) {
        res.json({ message: 'Form data deleted', deletedForm });
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.listen(3001,()=>{
    console.log("Server is running")
});





