// const passport = require('passport')
// const validator = require('validator')
// const User = require('../models/User')

//  exports.getLogin = (req, res) => {
//     if (req.user) {
//       return res.redirect('/todos')
//     }
//     res.render('login', {
//       title: 'Login'
//     })
//   }
  
//   exports.postLogin = (req, res, next) => {
//     const validationErrors = []
//     if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
//     if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
//     if (validationErrors.length) {
//       req.flash('errors', validationErrors)
//       return res.redirect('/login')
//     }
//     req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
//     passport.authenticate('local', (err, user, info) => {
//       if (err) { return next(err) }
//       if (!user) {
//         req.flash('errors', info)
//         return res.redirect('/login')
//       }
//       req.logIn(user, (err) => {
//         if (err) { return next(err) }
//         req.flash('success', { msg: 'Success! You are logged in.' })
//         res.redirect(req.session.returnTo || '/todos')
//       })
//     })(req, res, next)
//   }
  
//   exports.logout = (req, res) => {
//     req.logout(() => {
//       console.log('User has logged out.')
//     })
//     req.session.destroy((err) => {
//       if (err) console.log('Error : Failed to destroy the session during logout.', err)
//       req.user = null
//       res.redirect('/')
//     })
//   }
  
//   exports.getSignup = (req, res) => {
//     if (req.user) {
//       return res.redirect('/todos')
//     }
//     res.render('signup', {
//       title: 'Create Account'
//     })
//   }
  
//   // exports.postSignup = (req, res, next) => {
//   //   const validationErrors = []
//   //   if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
//   //   if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
//   //   if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
//   //   if (validationErrors.length) {
//   //     req.flash('errors', validationErrors)
//   //     return res.redirect('../signup')
//   //   }
//   //   req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
  


//   //   User.findOne({$or: [
//   //     {email: req.body.email},
//   //     {userName: req.body.userName}
//   //   ]}, (err, existingUser) => {
//   //     if (err) { return next(err) }
//   //     if (existingUser) {
//   //       req.flash('errors', { msg: 'Account with that email address or username already exists.' })
//   //       return res.redirect('../signup')
//   //     }
//   //     user.save((err) => {
//   //       if (err) { return next(err) }
//   //       req.logIn(user, (err) => {
//   //         if (err) {
//   //           return next(err)
//   //         }
//   //         res.redirect('/todos')
//   //       })
//   //     })
//   //   })


//   exports.postSignup = async (req, res, next) => {
//     try {
//         const validationErrors = [];
//         if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
//         if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
//         if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });
      
//         if (validationErrors.length) {
//             req.flash('errors', validationErrors);
//             return res.redirect('../signup');
//         }
//         req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

        

//         User.findOne({$or: [
//             {email: req.body.email},
//             {userName: req.body.userName}
//         ]}, (err, existingUser) => {
//             if (err) { return next(err); }
//             if (existingUser) {
//                 req.flash('errors', { msg: 'Account with that email address or username already exists.' });
//                 return res.redirect('../signup');
//             }

            

//                 async function generatePostId() {
//       try {
//           // Find the latest user from the user database
//           const latestUser = await User.findOne().sort({ id: -1 });
  
//           // If there are no users in the database, return 1 as the post ID
//           if (!latestUser) {
//               return 1;
//           }
  
//           // Otherwise, return the latest user's ID incremented by 1
//           return latestUser.id + 1;
//       } catch (error) {
//           console.error('Error generating post ID:', error);
//           throw error; // Throw error to handle it elsewhere
//      }
//   }

     
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
//   if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
//   if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

//   if (validationErrors.length) {
//       req.flash('errors', validationErrors);
//       return res.redirect('../signup');
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

//   // Generate a new user ID
//   generatePostId()
//       .then(userId => {
//           // Create a new user object with the generated ID
//           const newUser = new User({
//               id: userId,
//               userName: req.body.userName,
//               email: req.body.email,
//               password: req.body.password
//               // You can set other properties here if needed
//           });
          
//           // Save the new user to the database
//           return newUser.save();
//       })
//       .then(() => {
//           // Log in the user
//           req.logIn(newUser, (err) => {
//               if (err) {
//                   return next(err);
//               }
//               res.redirect('/todos');
//           });
//       })
//       .catch(error => {
//           console.error('Error generating post ID or creating user:', error);
//           res.status(500).json({ message: 'Internal server error' });
//       });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//         }
// };

  
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const Rating = require('../models/Rating');

// Helper function to generate a new user ID
async function generatePostId() {
    try {
        // Find the latest user from the user database
        const latestUser = await User.findOne().sort({ _id: -1 });
        console.log(latestUser);
        // If there are no users in the database, return 1 as the post ID
        if (!latestUser) {
            return 1;
        }
        console.log(latestUser._id + 1);
        // Otherwise, return the latest user's ID incremented by 1

        return Number(latestUser._id) + 1;
    } catch (error) {
        console.error('Error generating user ID:', error);
        throw error; // Throw error to handle it elsewhere
    }
}

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login', {
        title: 'Login'
    });
};

exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });

    if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect('/login');
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('errors', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        console.log('User has logged out.');
    });
    req.session.destroy((err) => {
        if (err) console.log('Error: Failed to destroy the session during logout.', err);
        req.user = null;
        res.redirect('/');
    });
};

exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('signup', {
        title: 'Create Account'
    });
};

// exports.postSignup = async (req, res, next) => {
//     try {
//         const validationErrors = [];
//         if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
//         if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
//         if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

//         if (validationErrors.length) {
//             req.flash('errors', validationErrors);
//             return res.redirect('../signup');
//         }
//         req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

//         // Generate a new user ID
//         const userId = await generatePostId();
//         // var userIdNum = Number(userId);
//         // Find existing user
//         const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] });

//         if (existingUser) {
//             req.flash('errors', { msg: 'Account with that email address or username already exists.' });
//             return res.redirect('../signup');
//         }

//         // Create a new user object with the generated ID
//         const newUser = new User({
//             _id: userId,
//             userName: req.body.userName,
//             email: req.body.email,
//             password: req.body.password
//             // You can set other properties here if needed
//         });

//         // Save the new user to the database
//         await newUser.save();

//         //add user to rating matrix
//         async function addUser(userId) {
//             try {
//                 // Get the existing ratings matrix
//                 let ratings = await Rating.findOne();
//                 let ratingsMatrix = ratings.ratingsMatrix;
                
//                 if(ratingsMatrix.length == 0){
//                     ratingsMatrix.push(new Array(1).fill(0));
//                 }
//                 else{
//                     // Add a new column (array of zeros) for the new user
//                 ratingsMatrix.forEach(row => {
//                     row.push(0);
//                 });
//                 }
                
        
//                 // Save the updated ratings matrix
//                 await Rating.updateOne({}, { ratingsMatrix: ratingsMatrix });
        
//                 console.log(`User ${userId} added successfully.`);
//             } catch (error) {
//                 console.error('Error adding user:', error);
//             }
//         }

//         // Log in the user
//         req.logIn(newUser, (err) => {
//             if (err) { return next(err); }
//             req.flash('success', { msg: 'Success! You are logged in.' });
//             res.redirect('/todos');
//         });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };



exports.postSignup = async (req, res, next) => {
    try {
        const validationErrors = [];
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

        if (validationErrors.length) {
            req.flash('errors', validationErrors);
            return res.redirect('../signup');
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

        // Generate a new user ID
        const userId = await generatePostId();
        
        // Find existing user
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] });

        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address or username already exists.' });
            return res.redirect('../signup');
        }

        // Create a new user object with the generated ID
        const newUser = new User({
            _id: userId,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
            // You can set other properties here if needed
        });

        // Save the new user to the database
        await newUser.save();
        // //add new ratings
        // try {
        //     const newRating = new Rating();
    
        //     await newRating.save();
    
        //     res.status(201).json({ message: 'Rating object added successfully', rating: newRating });
        // } catch (error) {
        //     console.error('Error adding rating object:', error);
        //     res.status(500).json({ message: 'Internal server error' });
        // }

        // Add the user to the rating matrix
        try {
            // Get the existing ratings matrix
            let ratings = await Rating.findOne();
            let ratingsMatrix = ratings.ratingsMatrix;
            
            if(ratingsMatrix.length === 0){
                ratingsMatrix.push(new Array(1).fill(0));
            }
            else{
                
                // Add a new column (array of zeros) for the new user
                ratingsMatrix.forEach(row => {
                    row.push(0);
                });
            }

            // Save the updated ratings matrix
            await Rating.updateOne({}, { ratingsMatrix: ratingsMatrix });

            console.log(`User ${userId} added successfully to rating matrix.`);
        } catch (error) {
            console.error('Error adding user to rating matrix:', error);
        }

        // Log in the user
        req.logIn(newUser, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect('/');
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



