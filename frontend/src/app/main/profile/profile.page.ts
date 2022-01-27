import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;
  private isLetters = /^[a-zA-Z]+/
  user: any;
  public editProfile: boolean = false;

  constructor(private cinemaSvc: CinemaService) { }

  async ngOnInit() {
    const result = await this.cinemaSvc.getUser();
    this.user = result;        
  }

  editUserProfile(data){
    const regexEmail = new RegExp(this.isValidEmail);
    const regexLetter = new RegExp(this.isLetters);

    if(!regexEmail.test(data.email)){
      Swal.fire({
        title: 'Enter a valid email',        
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }    

    if(!regexLetter.test(data.name) || !regexLetter.test(data.surname)){
      Swal.fire({
        title: 'Enter a valid name and surname',        
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }

    try {
      this.cinemaSvc.updateUser(data.email, data.name, data.surname, data.dateOfBirth);
      
      Swal.fire({
        title: "Updated !",
        text: "Profile Succesfully Updated.",
        icon: 'success',        
        confirmButtonColor: '#3085d6',                
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      
    } catch (error) {
      this.displayErrorMessage({
        "title": "Error!",
        "text": "Something Went Wrong"
      });
    }    
  }

  async changePassword(){
    let oldPassword = "";
    let newPassword1 = "";
    let newPassword2 = "";


    // Input for changing password 
    const { value: formValues } = await Swal.fire({
      title: 'Change Password',
      html:
        '<label>Old Password</label>' +
        '<input type="password" id="oldPassword" class="swal2-input">' +
        '<label>New Password</label>' +
        '<input type="password" id="newPassword1" class="swal2-input">'+
        '<label>Confirm New Password</label>' +
        '<input type="password" id="newPassword2" class="swal2-input">',                
      focusConfirm: false,
      preConfirm: () => {
        oldPassword = (<HTMLInputElement>document.getElementById('oldPassword')).value;
        newPassword1 = (<HTMLInputElement>document.getElementById('newPassword1')).value;
        newPassword2 = (<HTMLInputElement>document.getElementById('newPassword2')).value;
      }
    })
    

    // Empty fields validations
    if (oldPassword=="" || newPassword1=="" || newPassword2==""){
      this.displayErrorMessage({
        "title":"",
        "text": "Please Fill all the fields"
      });
      return;
    }

    // Validations for equal newPasswords
    if(newPassword1 != newPassword2){
      this.displayErrorMessage({
        "title":"",
        "text": "New Passwords doesn't match."
      });
      return;
    }


    // Minimun Length Validations
    if (newPassword1.length < 4 || newPassword2.length < 4){
      this.displayErrorMessage({
        "title":"",
        "text": "The minimum length for the password is 4."
      });
      return;
    }

    // Service Consumption
    try {      
      await this.cinemaSvc.changePassword(oldPassword, newPassword1)
      .subscribe(
        (res) => {
          if(res.status == 200){
            this.displaySuccessMessage({
              "title": "Success",
              "text": "Password Changed!\nPlease login to the platform again."
            },this.cinemaSvc.logout());
          }
        }, (err) => {
          this.displayErrorMessage({
            "title":"Error",
            "text":"Old Password does not match"
          });
        }      
      );

    } catch (error) {
      this.displayErrorMessage({
        "title":"Error",
        "text": `Something Went Wrong`
      });
    }
  }

  deleteUser(){
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete User!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
          //this.cinemaSvc.deleteUser();

          this.displaySuccessMessage({
            "title": "Deleted",
            "text": "User Has Been Deleted."
          }, this.cinemaSvc.logout());
          
        }
      })
    } catch (error) {
      this.displayErrorMessage({
        "title": "Error!",
        "text": "Something Went Wrong"
      });
    }
  }

  private displaySuccessMessage(message, action){
    Swal.fire({
      title: message.title,
      text: message.text,
      icon: 'success',        
      confirmButtonColor: '#3085d6',                
    }).then((result) => {
      if (result.isConfirmed) {
        action;
      }
    })
  }

  private displayErrorMessage(message){
    Swal.fire({
      title: message.title,
      text: message.text,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

}
