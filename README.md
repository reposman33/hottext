# DynamicTextComponent

## wat is het?

Deze component maakt het mogelijk delen in een tekst te vervangen door tekst uit een popupvenster. Bijvoorbeeld: in een tekst is een wood of woorden omkaderd (zg 'hottext'). Klik op de omkaderde tekst en een popup verschijnt met een of meerdere regels tekst. Klik op een regel in de popup en de popup verdwijnt. De oorspronkelijke omkaderde tekst is vervangen door de tekst uit de popup.

## Hoe werkt dat?

De tekst de vertoond wordt, wordt via [_content projection_](https://angular.io/guide/content-projection) vertoond in de view van de component. Omdat deze tekst als HTML opgemaakt is kunnen we delen van de tekst markeren met een data attribuut: data-hottext="OpenAI". Alleen tags gemarkeerd met zo'n attribuut (bijv <span data-hottext="OpenAI">) resulteren in een popup na erop klikken. De popup bevat de alternatieve teksten en die worden bepaald door de waarde van het data-attribuut (hier: "OpenAI").

(c) Marc Bakker 2023-12-03
