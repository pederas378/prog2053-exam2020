import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }

  //HTML form for updating an existing user
  render() {
    return html`
      <form onsubmit="javascript: return false;" id="userForm" method="POST">
        <div>
          <label for="email">Email</label>
          <input id="uname" name="uname" type="text" value="${this.user.uname}" required>
          <input type="hidden" id="uid" name="uid" value="${this.user.uid}">
        </div>
        <div>
          <label for="firstName">First name</label>
          <input id="firstName" name="firstName" type="text" value="${this.user.firstName}" required>
        </div>
        <div>
          <label for="lastName">Last name</label>
          <input id="lastName" name="lastName" type="text" value="${this.user.lastName}" required>
        </div>
        <div>
          <label for="oldpwd">Old password</label>
          <input id="oldpwd" name="oldpwd" type="password" type="text" value="" required>
        </div>
        <div>
          <label for="newpwd">New password</label>
          <input id="pwd" name="pwd" type="password" type="text" value="" required>
        </div>
        <input type="submit" @click=${this.updateUser} id="submitForm" name="editUser" value="Edit User"></input>
      </form>
    `;
  }

  //Update info of a user
  updateUser(e) {
    //Data from HTML form
    const dataForForm = new FormData(e.target.form);

    //fetch 'updateUser.php' and compare with data from HTML form
    fetch('api/updateUser.php', {
      method: 'POST',
      body: dataForForm
    }).then(res=>res.json())
      .then(data=>{
        if(data.status=='success') {
          console.log("The user was updated");
        } else {
          console.log("The user was not successfully updated");
        }
      })

  }

}
customElements.define('edit-user', EditUser);
