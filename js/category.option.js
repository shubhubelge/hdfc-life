$(document).ready(function() {

    var categoryItem = {
        "saving_the_environment": "Saving Environment",
        "financial_literacy": "Financial Literacy",
        "education": "Education",
        "animal_care": "Animal Care",
        "lend_a_hand": "Lend a Hand"
    };

    //This Json is used to send category name as required
    var categoryConstant = {
        "saving_the_environment": "SavingEnvironment",
        "animal_care": "SavingAnimals",
        "financial_literacy": "FinancialAwareness",
        "lend_a_hand": "HelpingHand",
        "education": "Education"
    }

    //Change certificate based on the category

    function displayInfo(info) {
        // console.log("info")
        // console.log(info)
        $(".certiBgImg").css('background-image', 'url(' + info.certiBgImg + ')');
        $(".certiTagline").html(info.certiTagline);
        $(".certiAuther").html(info.certiAuther);
        $(".certiQautes").html(info.certiQautes);
        $(".arnNumber").html(info.arnNumber);
    }

    function chagecertificate(value) {
        // console.log(value)
        var certiInfoObj = Object();
        // console.log("$( window ).width()")
        // console.log($(window).width() > 480)
        switch (value) {
            case 'SavingEnvironment':
                if ($(window).width() > 480) {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/saving-environment_02.png";
                } else {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/saving-environment_mobile.png";
                }
                certiInfoObj.certiTagline = "for saving the environment.";
                // certiInfoObj.certiBgImg = "assets/images/cerificate-bg.jpg";
                certiInfoObj.certiQautes = "Environment is no one’s property to destroy;  it’s everyone’s responsibility to protect.";
                certiInfoObj.certiAuther = "- Mohith Agadi";
                certiInfoObj.arnNumber = "ARN: MC/11/21/26496";

                break;
            case 'SavingAnimals':
                if ($(window).width() > 480) {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Animal_care.png";
                } else {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Animal_care_mobile.png";
                }
                certiInfoObj.certiTagline = "for caring for animals.";
                // certiInfoObj.certiBgImg = "assets/images/certificate-bg-animal.jpg";
                certiInfoObj.certiQautes = "It takes nothing away from a human to be kind to an animal.";
                certiInfoObj.certiAuther = "- Joaquin Phoenix";
                certiInfoObj.arnNumber = "ARN: MC/11/21/26497";

                break;
            case 'FinancialAwareness':
                if ($(window).width() > 480) {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Financial_Literacy.png";
                } else {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Financial_Literacy_mobile.png";
                }
                certiInfoObj.certiTagline = "for spreading financial awareness.";
                // certiInfoObj.certiBgImg = "assets/images/finacial-bg-logo.jpg";
                certiInfoObj.certiQautes = "It is better to light a lamp in the darkness, than curse it.";
                certiInfoObj.certiAuther = "- Maharshi Karve";
                certiInfoObj.arnNumber = "ARN: MC/11/21/26498";

                break;
            case 'HelpingHand':
                if ($(window).width() > 480) {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Lend-a-hand.png";
                } else {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Lend-a-hand_mobile.png";
                }
                certiInfoObj.certiTagline = "for lending a helping hand.";
                // certiInfoObj.certiBgImg = "assets/images/Certificate_Lend-Hand-logo.jpg";
                certiInfoObj.certiQautes = "You may never know what results come of your actions, but if you do nothing, there will be no results.";
                certiInfoObj.certiAuther = "- Mahatma Gandhi";
                certiInfoObj.arnNumber = "ARN: MC/11/21/26499";

                break;
            case 'Education':
                if ($(window).width() > 480) {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Education.png";
                } else {
                    certiInfoObj.certiBgImg = "assets/images/certi_bg/Education_mobile.png";
                }
                certiInfoObj.certiTagline = "for lighting the lamp of knowledge.";
                // certiInfoObj.certiBgImg = "assets/images/Certificate_Education.jpg";
                certiInfoObj.certiQautes = "The whole purpose of education is to turn mirrors into windows.";
                certiInfoObj.certiAuther = "- Sydney J. Harris";
                certiInfoObj.arnNumber = "ARN: MC/11/21/26175";
                break;
        }
        displayInfo(certiInfoObj);
    }

    if (sessionStorage.getItem("category") == null) {
        window.location = "index.html";
    } else {
        onloadPopulateCategory();
    }

    function onloadPopulateCategory() {
        var category = categoryConstant[sessionStorage.getItem("category")];
        chagecertificate(category);
        $('.form-container  .form-title').text(categoryItem[sessionStorage.getItem("category")]);
        //   $(".award-to.category-type").text(category);
    }

    if ($('#username').is(":visible")) {
        $('#username').keyup(function(e) {
            $('.certiBgImg .text-center .name-user').text(this.value)
        });
    }
});