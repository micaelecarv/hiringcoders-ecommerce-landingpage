function storeEmail() {
  let email = document.getElementById('mail').value
  let emailSavedOnLocalStorage = localStorage.getItem('userEmail')

  if (emailSavedOnLocalStorage === email) {
    alert('Email já cadastrado')
    return
  }

  localStorage.setItem('userEmail', email)
  alert('Email Cadastrado com Sucesso!')
}
