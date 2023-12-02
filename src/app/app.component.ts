import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hottext';
  hottext = `
  <div> 
  <p><span data-hottext>OpenAI<span>heeft de introductie van de GPT Store uitgesteld tot begin 2024. Dat schrijft Reuters. Het Amerikaanse AI-onderzoeksbureau zou eerst enkele verbeteringen willen doorvoeren na feedback van de eerste gebruikers.<\p>
  <p>De redactie van persagentschap Reuters heeft een interne memo van <span data-hottext>OpenAI<span>kunnen inkijken met daarin het nieuws van het uitstel. Het is echter niet duidelijk wanneer OpenAI de GPT-winkel precies wil uitbrengen.</p>
  <p><span data-hottext>OpenAI<span> heeft tijdens zijn ontwikkelaarsconferentie <a href="https://tweakers.net/nieuws/215332/chatgpt-gebruikers-kunnen-nu-eigen-versies-van-de-chatbot-creeren-en-delen.html" title="ChatGPT-gebruikers kunnen nu eigen versies van de chatbot creëren en delen" target=_blank">begin november</a> een nieuw platform aangekondigd waarmee gebruikers aangepaste versie van de AI-chatbot kunnen maken. Deze aangepaste GPT’s zijn alleen beschikbaar voor ChatGPT Plus- en Enterprise-abonnees. OpenAI kondigde toen ook de GPT Store aan: dat is een winkel waarmee de makers van aangepaste GPT’s inkomsten zullen kunnen genereren. OpenAI deelde toen ook een screenshots van de digitale winkel met daarin voorbeelden van aangepaste versies van de AI-chatbot. Het creëren en delen van GPT's is sinds 6 november mogelijk.</p>
  </div>
  `;
}
