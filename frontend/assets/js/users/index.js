$("#BtnCreateAccount").click(function () {
    if ($("#nombres").val() == "") {
        alert("El campo nombres es obligatorio");
        return;
    }
    if ($("#password").val() == "") {
        alert("El campo password es obligatorio");
        return;
    }
    if ($("#password2").val() == "") {
        alert("El campo password2 es obligatorio");
        return;
    }
    if ($("#password").val() != $("#password2").val()) {
        alert("Las contraseñas no coinciden");
        return;
    }
    if ($("#usuario").val() == "") {
        alert("El campo usuario es obligatorio");
        return;
    }
    if ($("#telefono").val() == "") {
        alert("El campo telefono es obligatorio");
        return;
    }
    if ($("#email").val() == "") {
        alert("El campo email es obligatorio");
        return;
    }
    let data = {
        nombres: $("#nombres").val(),
        contraseña: $("#password").val(),
        usuario: $("#usuario").val(),
        telefono: $("#telefono").val(),
        email: $("#email").val(),
        fecha_creacion: getCurrentDate()
    };
    $.ajax({
        url: "http://localhost:3001/api/v1/users/create",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            alert("Usuario creado correctamente");
            window.location.href = "login.html";
        },
        error: function (error) {
            alert("Error al crear el usuario " + error.responseJSON.message);
        }
    });
});