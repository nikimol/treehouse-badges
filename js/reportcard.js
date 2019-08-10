/*
 * js/reportcard.js v1.0
 *
 * Author: Niki Molnar
 * github.com/nikimol/reportcard
 *
 * The JS/jQuery file for ReportCard
 * It consists on one function - loadData() - to get the data via an XMLHttpRequest and then parse the data
 * The loadData() method is initialised on page load
 * -------------------------------------
 * Enter variables into js/config.js
 *
 * * * * * * * * * * * * * * * * * * * * * * 
 */

$(function() {
    
    var url = "https://teamtreehouse.com/" + userName + ".json";
    
    // If there is data, show the data
    $.get(url, function(data) {
    
        // BADGES
        var i=0;
        
        // How many badges are there in the data response?
        // If none, show the alert bar and hide the progress bars and badges sections
        lenBadges = data['badges'].length;
        
        // If showBadges in js/config.js is a number then keep it at that, otherwise if 'all' set the number to the number of badges
        if(showBadges=='all') { 
            showBadges = lenBadges; 
        }

        // Create the array to hold the badges details - arrBagdes
        var arrBadges = [];
        $.each(data['badges'], function(key, value) {
            arrBadges.push({
                name: value['name'], 
                icon: value['icon_url'],
                date: value['earned_date'],
                url: value['url']
            });
        });
        
        // Sort the array into date order descending
        arrBadges.sort(
            function(a, b) 
            {
                if(a.date < b.date) { return 1 }
                if(a.date > b.date) { return -1 }
                return 0;
            }
        );
        
        // Declare the variables
        var html = '';
        var thisDate = '';
        var dateFormat = '';
        
        // Loop through the arrBadges array and as long as the number is less than the showBadges number, show the badge
        $.each(arrBadges, function(key, value) {
            if(i < showBadges)
            {
                thisDate = new Date(value['date']);
                dateFormat = thisDate.toDateString();
                
                // Create the HTML from the array values
                html = '<div class="card col-12 col-md-4 col-lg-3 text-center"><a href="' + value['url'] + '" target="_blank"><img class="card-img-top pt-3 w-50 mx-auto" src="' + value['icon'] + '" alt="' + value['name'] + '"></a><div class="card-body"><h5><a href="' + value['url'] + '" target="_blank">' + value['name'] + '</a></h5><p>' + dateFormat + '</p></div></div>';
                
                // Append the HTML to the page - id="badgesDetails"
                $('#badgesDetail').append(html);
                i++;
            }
        });
        

        // POINTS
        
        // Create a fixed array with bootstrap colour variables
        var colArr = Array('success','info','danger','warning','success','info','danger');
        
        // Write the total points from the arrBadges to the page
        var totalPoints = data.points.total;
        $('#totalPoints').text(totalPoints);
        
        var newBar = '';
        var courseName = '';
        var percentageOfTotal = 0;
        var coursePoints = 0;
        
        // Create an array to hold the points data and loop through the data 
        var arrPoints = [];
        $.each(data['points'], function(key, value) {
            // Only add points above the variable minPointsShow set in js/config.js
            if(value > minPointsShow && key!='total') {
                arrPoints.push({v:value, k: key});
            }
        });
        
        // Sort the point array - highest value first
        arrPoints.sort(
            function(a,b)
            {
                if(a.v < b.v) { return 1 }
                if(a.v > b.v) { return -1 }
                return 0;
            }
        );
        
        // Loop through the arrPoints array 
        for(var i=0; i<arrPoints.length; i++) {
            courseName = arrPoints[i]['k'];
            coursePoints = arrPoints[i]['v'];
            
            percentageOfTotal = ((coursePoints * 100) / totalPoints);	// Calculate the percentage of total points
            percentageOfTotal = Math.round(percentageOfTotal);			// Round the number up
            
            // Create the Progress Bars HTML
            newBar = '<h5>' + courseName + '</h5><div class="progress"><div class="progress-bar bg-' + colArr[i] + '" role="progressbar" style="width: ' + percentageOfTotal + '%;" aria-valuenow="' + percentageOfTotal + '" aria-valuemin="0" aria-valuemax="100">' + percentageOfTotal + '%</div></div>';
            
            // Append the Progress bar to the #bars id on the page
            $('#bars').append(newBar);
        };
        $('#alertWait').hide();
        $('#zeroReturn').hide();
        $('#progressBars').show();
        $('#badges').show();
        
    }).fail(function() {
        // If there is no data/not JSON, show the alert div and hide the progress bars & badges divs
        $('#alertWait').hide();
        $('#zeroReturn').html('No badges have been found or unknown username in js/config.js has been entered: <strong>' + userName + '</strong>').show();
        $('#progressBars').hide();
        $('#badges').hide();
    });
});