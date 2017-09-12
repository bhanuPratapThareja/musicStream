app.directive('autoNext', function($parse,$timeout) {
    return {
       restrict: 'A',

       link: function($scope, element) {
            element.on("input", function(e) {
              //alert("input")

                if(element.val().length == element.attr("maxlength")) {
                 alert("igggf")
                  //  var nextElement = element.next();
                  //  console.log(nextElement[0].focus());
                   $(this).next().focus();

                }

            });
        }
    }
});
