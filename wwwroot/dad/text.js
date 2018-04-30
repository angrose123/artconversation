function clearCanvas(c) {
    var cc = document.getElementById(c);
    var ctx=cc.getContext("2d");
    ctx.clearRect(0,0,cc.width, cc.height);    
}

function computeNLP() {
    try {
        var t = "";
        t = document.getElementById('txtInput').value;
        t = t.trim();
        
        txtStats = "";  //final stats as text
        var cnt = 0;

        // parse the text        
        var txtPOS = nlp(t);
            
        // get the sentences of the text
        var txtSentences = txtPOS.sentences();
        cnt = txtSentences.length;
        var sentStats = new Array();
        
        // overall text stats
        textStats[0] = cnt;
        textStats[1] = txtPOS.questions().length;
        textStats[2] = txtPOS.quotations().length;
        textStats[3] = 0; //number of words
        textStats[4] = 0; //number of nouns
        textStats[5] = 0; //number of verbs
        textStats[6] = 0; //number of adverbs
        textStats[7] = 0; //number of adjectives  
        textStats[8] = 0; //total sentiment     

        // loop through each sentence
        for (var i=0; i<cnt; i++) {
            var snt = txtPOS.sentences(i);
            sentStats[0] = snt.terms().length;
            sentStats[1] = snt.terms().nouns().length;
            sentStats[2] = snt.terms().verbs().length;
            sentStats[3] = snt.terms().adverbs().length;
            sentStats[4] = snt.terms().adjectives().length;
            sentStats[5] = snt.terms().people().length;
            sentStats[6] = snt.terms().places().length;
            sentStats[7] = snt.terms().topics().length;
            sentStats[8] = snt.terms().organizations().length;
            sentStats[9] = snt.quotations().length;
            sentStats[10] = snt.questions().length;
            sentStats[11] = getSentiment(snt.out()); 
            sentStats[12] = getSentComp(snt.out());
                     
            //color based on RGB model
            totRealWords = sentStats[1] + sentStats[2] + sentStats[3] + sentStats[4]
            sentStats[13] = (sentStats[3] + sentStats[4]) / (sentStats[1] + sentStats[2]); //pct of desc over described
            sentStats[14] = (sentStats[2] + sentStats[4]) / totRealWords; //pct of verbs over totRealWords
            sentStats[15] = (sentStats[1] + sentStats[3]) / totRealWords; //pct of nouns over totRealWords
            
            //cumulative stats
            textStats[3] = textStats[3] + sentStats[0];
            textStats[4] = textStats[4] + sentStats[1];
            textStats[5] = textStats[5] + sentStats[2];
            textStats[6] = textStats[6] + sentStats[3];
            textStats[7] = textStats[7] + sentStats[4];
            textStats[8] = textStats[8] + sentStats[11];
            
            arrStats.push(sentStats);
            sentStats = []; // clear for next sentence
        } 
        //document.getElementById('nlpStats').innerText = txtStats;
        return arrStats;
    } catch (err) {
        alert(err.messages);
    }
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
