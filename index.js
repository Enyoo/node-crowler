var request = require('request');
var cheerio = require('cheerio');

var cases = '<table>';
request('https://www.worldometers.info/coronavirus/#countries', function(err, res, body) {
    if(err) console.log('erro: ' + err);

    var $ = cheerio.load(body);
    
    $("#main_table_countries_today tbody tr").each(function(){
        let teste = 0;
        let tr = $(this);
        // if(tr.attr('display') !=='none')
        let country = tr.find('.mt_a').text().trim();
        let totalCases = tr.find('td').eq(2).text().trim();
        let newCases = tr.find('td').eq(3).text().trim();
        let death = tr.find('td').eq(4).text().trim() ? tr.find('td').eq(4).text().trim() : 0;
        
        if(country !== '')
            cases += '<tr><td>' + country + '</td><td>' + totalCases + '</td><td>' + death + '</td></tr>';

    })
})
cases += '</table>'

document.open();
document.write(cases);
document.close();
