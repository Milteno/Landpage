$(function () {
    $(
        "#contactForm2 input,#contactForm2 textarea,#contactForm2 button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name2").val();
            var email = $("input#email2").val();
            var phone = $("input#phone2").val();
            var message = $("textarea#message2").val();
            var consentSMS = 0;
            if ($("input#input-agreement_3").is(':checked')) {
                var consentSMS = 1;
            }
            var consentMail = 0;
            if ($("input#input-agreement_2").is(':checked')) {
                var consentMail = 1;
            }
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            var query_string = (document.referrer==""?"direct":document.referrer)+"|:from|otf|to:|"+window.location.href;
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton2");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: "empty",
                    query_string: query_string,
                    consent_sms: consentSMS,
                    consent_mail: consentMail
                },
                cache: false,
                success: function () {
                    // Success message
                    $("#success2").html("<div class='alert alert-success'>");
                    $("#success2 > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success2 > .alert-success").append(
                        "<strong>Twoja wiadomość została wysłana. </strong>"
                    );
                    $("#success2 > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm2").trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#success2").html("<div class='alert alert-danger'>");
                    $("#success2 > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success2 > .alert-danger").append(
                        $("<strong>").text(
                            "Przepraszamy " +
                                firstName +
                                ", wygląda na to, że serwer mailowy nie odpowiada. Prosimy spróbować za chwilę"
                        )
                    );
                    $("#success2 > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm2").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
