## Korištenje

Pokrenite aplikaciju u razvojnom okruženju koristeći "npm run dev".

## Sučelje

Sučelje omogućuje korisniku odabir različitih opcije izbornika: pregled svih pošiljki, stvaranje nove pošiljke ili ažuriranje postojeće pošiljke.

Sučelje koristi USeContext hook za dijeljenje stanja između komponenata te prikazivanje komponenata u ovisnosti o currentViewu. 

Sučelje koristi UseState hook za dijeljenje pošiljki između komponenti.

## Komponente

CreateShipment.jsx šalje HTTP POST zahtjev na "https://jsonplaceholder.typicode.com/posts" kako bi simulirao stvaranje nove pošiljke na  backendu. Nakon uspješnog stvaranja, ažurira stanje pošiljki i vraća prikaz na početni api.

UpdateShipment.jsx šalje HTTP PATCH zahtjev na "https://jsonplaceholder.typicode.com/posts/{orderId}" kako bi simulirao ažuriranje postojeće pošiljke na backendu. Nakon uspješnog ažuriranja, ažurira stanje pošiljki i vraća prikaz na početni api.

Shipments.jsx je dizajniran da prikaže sve stvorene pošiljke. Nije ostvaren GET zahtjev niti lokalno spremanje podataka. Prikazuje trenutno stanje pošiljki koje je dijeljeno putem useContext hook. Dodatno, omogućuje filtriranje po tri različite značajke: Customer ID, Shipment Status i Order ID.

## Autor

Petar Majić
