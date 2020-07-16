const User = require('../models/userModel');

exports.forgotPassword = async (req, res) => {
    // 1) Get user based on POSTed email
    const { email } = req.body;

    const user = await User.findOne({ email: email });
  
    if (!user) {
      req.flash('success_msg', 'There is no user with that email address. 😞');
      return res.redirect('/users/forgetpass');
    }
  
  
  
    // 2) Generate the random reset token
    // const resetToken = user.createPasswordResetToken();
    // await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    // try {
    //   const resetURL = `${req.protocol}://${req.get(
    //     'host'
    //   )}/api/v1/users/resetPassword/${resetToken}`;
    //   await new Email(user, resetURL).sendPasswordReset();
  
    //   res.status(200).json({
    //     status: 'success',
    //     message: 'Token sent to email!'
    //   });
    // } catch (err) {
    //   user.passwordResetToken = undefined;
    //   user.passwordResetExpires = undefined;
    //   await user.save({ validateBeforeSave: false });
  
    //   return next(new AppError('There was an error sending the email. Try again later!'), 500);
    // }
  }
  