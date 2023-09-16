## Installation

Run `npm run install-all` in the project root.

## Quick Start

Run `npm run start` from the project root.

## Running Tests

Run server-side tests with `npm test` from the project root.
Run E2E tests with the `npm run e2e` command from project root.

## Usage of Project

- Open browser and go to "http://localhost:4200/".
- You can add traveller name and expense of him/her. If you click add button, traveller detail will be shown in table. If you click traveller detail row in table, that detail will be removed from table.
- If you click "Settle Up" button, you will be navigated to other page and you can see payouts details.
- You can also can be navigated to list of expense page and add or remove traveller details using header's navigation buttons.

## Functionality of Project

If you send traveller's details to server, payouts details will be created with time complexity(n log n) and sent to cient side.
(n: number of travellers)
