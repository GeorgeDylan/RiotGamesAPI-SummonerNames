const TeemoJS = require('teemojs');
let api = TeemoJS('RGAPI-xxxxxx');
let availableChamps = [];
var operationsCompleted = 0;

var champs = "Aatrox,Ahri,Akali,Alistar,Amumu,Anivia,Annie,Aphelios,Ashe,Aurelion Sol,Azir,Bard,Blitzcrank,Brand,Braum,Caitlyn,Camille,Cassiopeia,Cho'Gath,Corki,Darius,Diana,Dr. Mundo,Draven,Ekko,Elise,Evelynn,Ezreal,Fiddlesticks,Fiora,Fizz,Galio,Gangplank,Garen,Gnar,Gragas,Graves,Hecarim,Heimerdinger,Illaoi,Irelia,Ivern,Janna,Jarvan IV,Jax,Jayce,Jhin,Jinx,Kai'Sa,Kalista,Karma,Karthus,Kassadin,Katarina,Kayle,Kayn,Kennen,Kha'Zix,Kindred,Kled,Kog'Maw,LeBlanc,Lee Sin,Leona,Lissandra,Lucian,Lulu,Lux,Malphite,Malzahar,Maokai,Master Yi,Miss Fortune,Mordekaiser,Morgana,Nami,Nasus,Nautilus,Neeko,Nidalee,Nocturne,Nunu and Willump,Olaf,Orianna,Ornn,Pantheon,Poppy,Pyke,Qiyana,Quinn,Rakan,Rammus,Rek'Sai,Renekton,Rengar,Riven,Rumble,Ryze,Sejuani,Senna,Sett,Shaco,Shen,Shyvana,Singed,Sion,Sivir,Skarner,Sona,Soraka,Swain,Sylas,Syndra,Tahm Kench,Taliyah,Talon,Taric,Teemo,Thresh,Tristana,Trundle,Tryndamere,Twisted Fate,Twitch,Udyr,Urgot,Varus,Vayne,Veigar,Vel'Koz,Vi,Viktor,Vladimir,Volibear,Warwick,Wukong,Xayah,Xerath,Xin Zhao,Yasuo,Yorick,Yuumi,Zac,Zed,Ziggs,Zilean,Zoe,Zyra";
champs = champs.replace(/'/g, "");
champs = champs.split(',');

console.log('Running');
console.log(champs);

let timestamp = Date.now();

for (id in champs) {
    let champ = champs[id];

    api.get('na1', 'summoner.getBySummonerName', champ)
        .then(function(data) {
            if(data) {
                api.get('na1', 'match.getMatchlist', data.accountId, {endIndex: '1'})
                    .then(function(data) {
                        if(data) {
                            timeDifference(timestamp, data.matches[0].timestamp, champ)
                        } else {
                            console.log('Error getting matches for: ' + champ);
                        }
                        operation();
                    })
            } else {
                console.log ('Error fetching: ' + champ);
                operation();
            }
        });
    
}



function timeDifference(date1,date2, name) {
    console.log('Summoner Name: ' + name);
    var difference = date1 - date2;

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    if(daysDifference > 912) {
        console.log('Available!');
        availableChamps.push(name)
    } else {
        let availableDate = 912 - daysDifference;
        console.log('Days until Available: ' + availableDate);
    }

    console.log('---------------------');
}

function operation() {
    ++operationsCompleted;
    if (operationsCompleted === champs.length) {
        console.log('Available Names:');
        console.log(availableChamps);
    } 
}