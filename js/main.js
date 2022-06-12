// Example starter JavaScript for disabling form submissions if there are invalid fields
var imagelink;
var certificatelink;
(function() {
    'use strict';
    var domain;
    var APIURL = {
        "UAT": {
            "count": "https://beta-api.hdfclife.tech/forms/agent-of-good-lead/",
            "form": "https://beta-api.hdfclife.tech/forms/agent-of-good-lead/"
        },
        "PROD": {
            "count": "https://api.hdfclife.com/forms/agent-of-good-lead/",
            "form": " https://api.hdfclife.com/forms/agent-of-good-lead/"
        }
    }

    var enviornment = domainName();

    function submitForm(certificate) {
        var formDataValue = {};
        var gender = $(".gender-input input:checked").val();
        var username = $("#username").val().trim();
        var age = $("#userage").val();
        var identity = $(".you-are-radio input:checked").val();
        // var data = new FormData(jQuery('#form-data')[0]);
        formDataValue.age = age;
        formDataValue.username = username;
        formDataValue.identity = identity;
        formDataValue.gender = gender;
        var certificate = certificate;
        var formData = new FormData();
        formData.append('name', username);
        formData.append("identity", identity);
        formData.append("gender", gender);
        formData.append("certificate", certificate);
        // formData.append("image", "https://beta-brandsite-static.hdfclife.tech/media/certificate/96311hardik.png");
        formData.append("age", age);
        formData.append("image", $("#fileupload")[0].files[0]);
        formData.append("category", sessionStorage.getItem("category"));

        $.ajax({
            type: 'POST',
            url: APIURL[enviornment]["form"],
            data: formData,
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            success: function(data) {
                //function here
                if (data.message == 'Data saved successfully') {
                    $(".disabled-button").prop('disabled', false);
                    if (data.data.certificate != null) certificatelink = data.data.certificate;

                }
            },
            error: function(data) {
                alert("Something went wrong");
            }
        });
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {
            type: mime
        });
    }

    function convertImage() {
        // var username = $("#username").val();
        // $('.name-user').text(username);
        // $("#btn_convert").on('click', function() {
        $(".certi-container .certi-box .certi-bg .name-user").addClass("certi-creation");
        html2canvas(document.getElementById("certificate")).then(function(canvas) {
            if ($('.certificate-image').length > 0) $('.certificate-image').remove();
            var anchorTag = document.createElement("a");
            anchorTag.className = "certificate-image";
            document.body.appendChild(anchorTag);

            // document.getElementById("previewImg").appendChild(canvas);
            anchorTag.download = "filename.jpg";
            anchorTag.href = canvas.toDataURL();
            imagelink = anchorTag.href;
            anchorTag.target = '_blank';
            // anchorTag.click();
            var certificate = dataURLtoFile(canvas.toDataURL(), "certificate.png");
            $(".certi-container .certi-box .certi-bg .name-user").removeClass("certi-creation");
            submitForm(certificate);
        });
        // });
        // $("#btn_convert").click();
    }

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // /* Loop over them and prevent submission */
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {

                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault()
                    event.stopPropagation()
                }
                var usrname = $('#username');
                var age = $('#userage');
                var file = $("#fileupload");

                if (usrname.val() != '') {
                    if (usrname.length < 50) {
                        console.log('valid name');
                        usrname.siblings('.invalid-feedback').hide();
                    } else {
                        alert('You have exceeded the 50 character limit');
                    }
                } else {
                    usrname.siblings('.invalid-feedback').show();
                }

                if (age.val() != '') {
                    if (age.val() > 17) {
                        console.log('valid age');
                        age.siblings('.invalid-feedback').hide();
                    } else {
                        alert('Minimum age should be 18.');
                    }
                } else {
                    usrname.siblings('.invalid-feedback').show();
                }

                if ($('input[type=radio][name=selectGender]:checked').length == 0) {
                    $(".gender-input").after('<div class="invalid-feedback" style="display: block;margin-left: 25px;">Select a gender!</div>');
                    return false;
                } else {
                    $(".gender-input").siblings('.invalid-feedback').hide();
                }




                if ($('input[type=radio][name=youare]:checked').length == 0) {
                    $(".you-are-radio").after('<div class="invalid-feedback" style="display: block;">Select one option!</div>');
                    return false;
                } else {
                    $(".you-are-radio").siblings('.invalid-feedback').hide();
                }
                form.classList.add('was-validated');
                if (this.checkValidity() && validateForm()) {
                    convertImage();
                }
            }, false)
        });

    // Total users enrolled function (counter)
    function counter() {
        $.ajax({
            type: "GET",
            url: APIURL[enviornment]["count"],
            success: function(data) {
                if (data.count != "undefined") populateCount(data.count);
            },
            error: function(data) {
                alert("Something went wrong");
            }
        });
    }

    if ($(".counter .counter-box #count-2").length != 0) counter();

    $('.alpha').on('keydown', function(e) {
        if (this.value.length === 0 && e.which === 32) e.preventDefault();
    });

    function domainName() {
        var hostname = location.host;
        hostname = hostname.replace("www.", "");
        var environment;
        if (hostname == "agents-of-good.com") {
            // environment = "PROD";
            environment = "UAT";
        } else {
            environment = "UAT";
        }
        return environment;
    }

    // Form validate Funtion 
    function validateForm() {
        var flag = true;
        var usrname = $('#username');
        var age = $('#userage');
        var file = $("#fileupload");

        // Username Validation
        if (usrname.val() != '') {
            var reChar = /^[A-Za-z]+$/;

            if (usrname.val().length < 50 && reChar.test(usrname.val().replaceAll(" ", ""))) {
                $(usrname).prop("required", true);

            } else {
                $(usrname).prop("required", true);
                alert('You have exceeded the 50 character limit and Special Charecters not allowed');
                return false;
            }
        } else {
            $(usrname).prop("required", true);
            // usrname.siblings('.invalid-feedback').show();
            return false;
        }

        // Age Validation
        if (age.val() != '') {
            var regNum = /^(0|[1-9][0-9]*)$/;
            if (regNum.test(age.val())) {
                if ((age.val() > 17) && (age.val() < 100)) {
                    $(age).prop("required", true);
                } else if (age.val() > 100) {
                    $(age).prop("required", true);
                    alert('Maximum age limit is 99.');
                    return false;
                } else {
                    $(age).prop("required", true);
                    alert('Minimum age should be 18.');
                    return false;
                }
            } else {
                $(age).prop("required", true);
                alert('Age should numeric value and greater then 18');
                return false;
                //  usrname.siblings('.invalid-feedback').show();
            }
        } else {
            $(age).prop("required", true);
            return false;
        }

        // Gender avlidation
        // if ($('input[type=radio][name=selectGender]:checked').length == 0) {
        //     $(".gender-input").after('<div class="invalid-feedback" style="display: block;margin-left: 25px;">Select a gender!</div>');
        //     return false;
        // } else {
        //     $(".gender-input").siblings('.invalid-feedback').hide();
        // }

        // File upload Validation
        if (file.val() != '') {
            var fname = file.val()
            var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
            var maxSizeKB = 5000; //Size in KB
            var maxSize = maxSizeKB * 1024; //File size is returned in Bytes
            $(file).prop("required", true);
            if (!re.exec(fname)) {
                file.val("");
                $(file).siblings(".upload-box").find(".filename").text("");
                alert("Select image with jpg, jpeg,png format only");
                return false;
            } else if (file[0].size > maxSize) {
                file.val("");
                $(file).siblings(".upload-box").find(".filename").text("");
                alert("Max size exceeded, Image size should be less then 5Mb");
                return false;
            }
        } else {
            alert("Select Image File");
            return false;
            // file.siblings('.invalid-feedback').show();
        }

        // // You are Validation
        // if ($('input[type=radio][name=youare]:checked').length == 0) {
        //     $(".you-are-radio").after('<div class="invalid-feedback" style="display: block;">Select one option!</div>');
        //     return false;
        // } else {
        //     $(".you-are-radio").siblings('.invalid-feedback').hide();
        // }

        return flag;
    }
})();

// function AllowOnlyNumbers(e) {
//     e = e ? e : window.event;
//     var clipboardData = e.clipboardData ? e.clipboardData : window.clipboardData;
//     var key = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
//     var str =
//         e.type && e.type == "paste" ?
//             clipboardData.getData("Text") :
//             String.fromCharCode(key);
//     return /^\d+$/.test(str);
// }

$('input#fileupload').on('change', function() {
    var filePath = $(this).val();
    // console.log(filePath);
    var maxSizeKB = 5000; //Size in KB
    var maxSize = maxSizeKB * 1024; //File size is returned in Bytes
    var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    if (!re.test(this.files[0].name)) {
        alert("Select image with jpg, jpeg,png format only");
        files.attr("accept", "image/*");
        return false;
    } else if (this.files.length != 0) {
        if (this.files[0].size > maxSize) {
            $(this).val("");
            alert("Max size exceeded, Image size should be less then 5Mb");
            return false;
        }
    }
    $('.filename').text(filePath.substring(filePath.lastIndexOf("\\") + 1, filePath.length));
    var reader = new FileReader();
    reader.onload = function(e) {
        reader.result + '->' + typeof reader.result;
        // console.log(reader.result + '->' + typeof reader.result)
        var thisImage = reader.result;
        $('.user-img-box .img-placeholder').hide();
        var uploadedImg = '<img src="assets/images/Logo.jpg" class="user-upload" alt="">';
        //  if ($(" .certi-box .user-img-bg .user-img-box .user-upload").length == 0) $(" .certi-box .user-img-bg .user-img-box").append(uploadedImg)
        // $('.model-certificate .user-upload').attr('src', thisImage);
        //   $('.user-img-box .user-upload').attr('src', thisImage);
        //   $(" .certi-box .user-img-bg .user-img-box .user-upload").show();
        // $('.user-img-box .user-upload').show();
        // localStorage.setItem("imgData", thisImage);
    };
    if (this.files.length != 0) {
        reader.readAsDataURL(this.files[0]);
    } else {
        $('.user-img-box .img-placeholder').show();
        $(" .certi-box .user-img-bg .user-img-box .user-upload").hide();
    }

});

$(document).ready(function() {
    $('.needs-validation').submit(function(e) {
        e.preventDefault();
    });

    $(".category .next-btn").click(function(e) {
        if ($('.display-big .category-text input[name="group"]').is(":visible")) {
            if ($('.display-big .category-text input[name="group"]:checked').val() == undefined) {
                e.preventDefault();
                alert("Select category");
            } else {
                sessionStorage.setItem("category", $('.display-big .category-text input[name="group"]:checked').val());
            }
        } else if ($('.display-small .radio-text input[name="category-radio"]').is(":visible")) {
            sessionStorage.setItem("category", $('.display-small .radio-text input[name="category-radio"]:checked').val());
        }
    });

    $(".btn.reset-btn-new").click(function() {
        $(".needs-validation")[0].reset();
        $(".needs-validation span.filename").html("");
        $(" .certi-box .user-img-bg .user-img-box .user-upload").hide();
        $('.user-img-box .img-placeholder').show();
        $(".disabled-button").prop('disabled', true);
        $('.certiBgImg .text-center .name-user').text("");
    });

    $(".download").on('click', function() {
        $(".download").attr("download", "certificate.png").attr("href", imagelink);
        $('#staticBackdrop').modal('hide');
        $('#thankyoupopup').modal('show');
    });

    $('.alpha').keypress(function(e) {
        if (String.fromCharCode(e.which).match(/[^a-zA-Z\b ]/g)) {
            return false;
        }
    });

    $(".age-input").keydown(function(event) {
        if (event.keyCode === 38 || event.keyCode === 40) {
            event.preventDefault();
        }
    });

    //Print Certificate Image 
    function CertificateSourcetoPrint(source) {
        return "<html><head><script>function step1(){\n" +
            "setTimeout('step2()', 10);}\n" +
            "function step2(){window.print();window.close()}\n" +
            "</scri" + "pt></head><body onload='step1()'>\n" +
            "<img src='" + source + "' /></body></html>";
    }

    $('.footer-btn .print').click(function(e) {
        var mediaQuery = window.matchMedia('(min-width: 768px)');
        var imageWidth;
        if (mediaQuery.matches) {
            imageWidth = "width:70% ; padding: 0; margin:0;"; // Deskstop and Ipad
        } else if (window.matchMedia('(max-width: 640px)').matches) {
            imageWidth = "width:50%; padding: 0; margin:0;"; // Mobile Device
        }

        printJS({
            printable: [imagelink],
            type: 'image',
            imageStyle: imageWidth
        });

        // Pagelink = "about:blank";
        // var pwa = window.open(Pagelink, "_new");
        // pwa.document.open();
        // pwa.document.write(CertificateSourcetoPrint(imagelink));
        // pwa.document.close();
        $('#staticBackdrop').modal('hide');
        $('#thankyoupopup').modal('show');
    });

    $('.btn-popup.share').click(function() {
        // An image to be passed here which is commented right now for demo.
        // var img_src = $('.bottom-logo').attr('src');
        var img_src = certificatelink.replaceAll(" ", "%20");
        // The url for the image would change once the certificate gets generated dynamically.
        var fb = 'http://www.facebook.com/sharer/sharer.php?u=' + img_src;
        var linkedin = 'http://www.linkedin.com/shareArticle?mini=true&url=' + img_src;
        window.open(fb, '_blank').focus();
        $('#staticBackdrop').modal('hide');
        $('#thankyoupopup').modal('show');
    });

    //Diable Copy Paste-Your Name
    $('#username').bind('copy paste', function(e) {
        e.preventDefault();
        return false;
    });

    //Diable Copy Paste-Age
    $('#userage').bind('copy paste', function(e) {
        e.preventDefault();
        return false;
    });
});

// for radio change in index
$('input[type=radio][name=category-radio]').change(function() {
    $('.small-cotegory-content').hide()
    if (this.value == 'saving_the_environment') {
        $('.saving_the_environment').show()
    } else if (this.value == 'financial_literacy') {
        $('.financial_literacy').show()
    } else if (this.value == 'education') {
        $('.education').show()
    } else if (this.value == 'animal_care') {
        $('.animal_care').show()
    } else if (this.value == 'lend_a_hand') {
        $('.lend_a_hand').show()
    }
});

//Function for populate count on page 
function populateCount(count) {
    var actualCountLength = 5;
    var userCount = count;
    userCount = userCount.toString();
    if (actualCountLength != userCount.length) {
        var actualCountLength = 5;
        var prefix;
        for (var k = 1; k <= actualCountLength - userCount.length; k++) {
            prefix = "0" + prefix;
        }
        prefix = prefix.replace("undefined", "");
        $('#count-2').html(prefix + userCount);
    } else {
        $('#count-2').html(userCount);
    }
}