function computeNLP() {
    try {
        // Step 1: create a variable to get the long string from txtInput form field and then trim
        var t = document.getElementById("txtInput").value;
        t.trim();
        // Step 2: create a variable called cnt and set 0
        var cnt = 0;

        // Step 3: create a variable called txtPOS and call the nlp() function passing the variable from step 1
        var txtPOS = nlp(t);
        // Step 4: create a variable called txtSentences using the sentences method of variable from Step 3
        var txtSentences = txtPOS.sentences();
        // Step 5: set the length of txtSentences to variable cnt
        cnt = txtSentences.length;
        // Step 6: create am array variable called sentStats
        var sentStats = [];

        // Step 7: set the first element of the textStats array to cnt
        textStats[1] = cnt;
        // Step 8: set the second element of the textStats array to the number of questions in txtPOS
        textStats[2] = txtPOS.questions().length;
        // Step 9: set the third elemment of the textStats array to the number of quotations in txtPOS  
        textStats[3] = txtPOS.quotations().length;      

    
        // Step 10: loop from 0 to cnt-1
        for (var i = 0; i <= cnt-1; i++) {
            //  create variable snt which is the ith element of the sentences collection of txtPOS
            var snt = txtPOS.sentences(i);
            //  set elements 0 through 12 of different facts from snt
                   sentStats[0] = snt.terms().length;
            //     1 is nouns
                   sentStats[1] = snt.terms().nouns.length;
            //     2 is verbs
                   sentStats[2] = snt.terms().verbs.length;
            //     3 is adverbs
                   sentStats[3] = snt.terms().adverbs.length;
            //     4 is adjectives
                   sentStats[4] = snt.terms().adjectives.length;
            //     5 is people
                   sentStats[5] = snt.terms().people.length;
            //     6 is places
                   sentStats[6] = snt.terms().places.length;
            //     7 is topics
                   sentStats[7] = snt.terms().topics.length;
            //     8 is organizations
                   sentStats[8] = snt.terms().organizations.length;
            //     9 is snt.quotations().length
                   sentStats[9] = snt.quotations().length;
            //    10 is snt.questions().length
                   sentStats[10] = snt.questions().length;
            //    11 is passing snt.out() into getSentiment function
                   sentStats[11] = getSentiment(snt.out());
            //    12 is passing snt.out() into getSentComp function
                   sentStats[12] = getSentComp(snt.out());
            //    calc totRealWords as sum of elements 1+2+3+4
                   var totRealWords = sentStats[1] + sentStats[2] + sentStats[3] + sentStats[4];
            //    13 is (3+4)/(1+2)
                   sentStats[13] = (sentStats[3] + sentStats[4])/(sentStats[1] + sentStats[2]);
            //    14 is 2 / totRealWords
                   sentStats[14] = sentStats[2]/totRealWords;
            //    15 is 1 / totRealWords
                   sentStats[15] = sentStats[1]/totRealWords;
            //    push sentStats into arrStats array
                   arrStats.push(sentStats);
            //    clear sentStats array
                   sentStats = [];
        }
        // Step 11: return arrStats for this function   

        return arrStats;     
    } catch (err) {
        alert(err.messages);
    }
}



function clearCanvas(c) {
    var cc = document.getElementById(c);
    var ctx=cc.getContext("2d");
    ctx.clearRect(0,0,cc.width, cc.height);    
}

function getSentiment(s) {
    try {
        var x = getSent(s);
        return x['score'];
    } catch (err) {
        alert(err.message);
    }
}

function getSentComp(s) {
    try {
        var x = getSent(s);
        return x['comparative'];
    } catch (err) {
        alert(err.message);
    }
}
