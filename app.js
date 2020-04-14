
const axios = require('axios');

const puppeteer = require('puppeteer');

const path = require("path");
const hbs = require('hbs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();




app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views')

app.use('/assets',express.static(__dirname + '/views'));

app.get('/',  function(req, res){
  res.render('form', {layout: false})
})

app.post('/formAction', async function(req, res){
  console.log(req.body.user);

let urlFirst = req.body.url;
let url = urlFirst.toString();
let arrayNomes = req.body.user;


(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();

  
  await page.goto('https://instagram.com/');
  await page.waitFor('button[type=submit]');
  await page.click('button[type=submit]');
  await page.waitFor(500);

  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]', process.env.USERNAME);
  await page.type('input[name="password"]', process.env.PASSWORD);
  await page.click('button[type=submit]');
  await page.waitFor(500);
  await page.waitFor('button.HoLwm')
  await page.click('button.HoLwm')
  await page.goto(url)
  await page.waitFor('textarea');
  

  const button ='button.afkep';
  while(await page.$(button) !== null){
    page.click(button);
    await page.waitFor(1000);
  }

  function getText(linkText) {
    linkText = linkText.replace(/\r\n|\r/g, "\n");
    linkText = linkText.replace(/\ +/g, " ");
  
    // Replace &nbsp; with a space 
    var nbspPattern = new RegExp(String.fromCharCode(160), "g");
    return linkText.replace(nbspPattern, " ");
  }

  let countVar1 = 0;
function count1() {
       countVar1 ++;
       return countVar1;
}

  async function findByLink1(page, array) {
    const links = await page.$$('a.ZIAjV')
    for (var i=0; i < links.length; i++) {
      for (var j=0; j<array.length; j++){
      let valueHandle = await links[i].getProperty('innerText');
      let linkText = await valueHandle.jsonValue();
      const text = getText(linkText);
      if (arrayNomes[j] == text) {
        count1();
      }
    }
  }
  
    return null;
  }



 await findByLink1(page, arrayNomes);

 console.log("resultado", countVar1);


 res.render('index', {countVar1: countVar1})


  await browser.close();

})();





});



app.listen(process.env.PORT || 3007, function() {
    console.log("Rodando")
});
