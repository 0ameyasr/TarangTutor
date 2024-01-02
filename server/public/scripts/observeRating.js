document.addEventListener('DOMContentLoaded', function () {

    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            if(this.value != 0)
            {
                document.getElementById("rating-commit").disabled = false;
            }
        });
    });
});
