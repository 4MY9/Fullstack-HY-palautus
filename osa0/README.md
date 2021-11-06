
![](/osa0/0.4.png)

0.4 Uusi muistiinpano  

selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note  
palvelin-->selain: 302 Found  
note over palvelin:  
Uudelleenohjauspyyntö.   
Palvelin kehottaa selainta tekemään uuden  
GET pyynnön osoitteeseen notes.  
end note  
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes  
palvelin->selain: HTML-koodi  
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css  
palvelin-->selain: main.css  
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js  
palvelin-->selain: main.js  
selain-->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json  
palvelin-->selain: data.js  

note over selain:  
selain suorittaa tapahtumankäsittelijän  
joka näyttää muistiinpanot näytöllä  
end note

![](/osa0/0.5.png)

0.5: Single Page App   

Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa  
Palvelin->Selain: JSON  
note over Selain:  
Selain lataa muistiinpanot   
JSON mutoisena palvelimelta.  
end note  


![](/osa0/0.6.png)

0.6: Single Page App Uusi muistiinpano  

Selain->Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa  
note over Palvelin:  
Sisältää muistiinpanon  
JSON-muodossa (sisältö ja aikaleima).  
end note  
note over Selain:  
Selain lataa palvelimelta JavaScript-koodin.   
Koodi hakee muistiinpanot palvelimelta JSON-muotoisena.  
end note  
Palvelin->Selain: Statuskoodi: 201 Created  
note over Selain:   
Javascript koodi luo uuden muistiinpanon,   
lisää sen listalle,   
piirtää uuden listan ja lähettää uuden  
muistiinpanon palvelimelle. 
end note  
