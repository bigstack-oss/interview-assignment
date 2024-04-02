# Assignment

Cube Cloud Management Platform (Cube CMP) Instances Table

![Instance Table](/docs/it-1.png)


## Objective

Re-create the "Instances" table using ReactJS from the provided designs, using the mock API data provided.

To make your submission, fork this repository and submit a pull request with your code.

You should make your submission within **1 week** from when you receive the assignment. 

## Brief

Screenshots of the table ui are in the `docs` directory of this project. Follow the designs as closely as possible. The UI does NOT need to be responsive for mobile/tablet devices. But it should gracefully handle small and large desktop screen sizes.

**UI Library**

You are expected to use the Carbon React components library to complete this project: 

- [@carbon/react](https://www.npmjs.com/package/@carbon/react)
- [@carbon/icon](https://www.npmjs.com/package/@carbon/icons-react)
- [Carbon storybook](https://react.carbondesignsystem.com/?path=/docs/getting-started-welcome--welcome)
- [icon library](https://carbon-elements.netlify.app/icons/examples/preview/)

You should use the `DataTable` component to implement the table. You may implement some other custom components as necessary, but use the Carbon library as much as possible.

We intentionally have **not** provided a figma document, so you will need to make some UI/UX decisions on your own. Use your experience and best judgment.

**Data Fetching**

There is a simple express server setup in this repository, with one endpoint `/instances`. 

Try [http://localhost:9080/instances](http://localhost:9080/instances) to see the data scheme.


![/instances endpoint](/docs/it-instances-endpoint.png)


It will return a JSON payload with all the instance data necessary to render the table.

You will need to use `SWR` or a similar library to implement continuous data fetching from the `/instances` endpoint. You are free to use other libraries (e.g. `axios`) as well to handle data fetching.

- [swr](https://www.npmjs.com/package/swr)


## Required Features

**0) Instances Data Table**

Render `/instances` endpoint response data in data table and have below columes
- instance name with flavor
- keypair
- interface IP
- floating IP
- owner
- expire
- created
- status 
- overflow menu options (three dots in screenshot)

**Hint: use Carbon DataTable, Tag and carbon database icon**

**1) Overflow Menu (UI Only)**

When the user clicks the `...` button in the end of a row, an overflow menu should appear with the given options. You **do not** need to implement the actions for each menu item.

![Overflow Menu](/docs/it-overflow.png)

**Hint: use Carbon OverflowMenu, OverflowMenuItem**

**2) Edit Tags Modal**

When the user clicks `Add..` under the `Tags` column, a modal should appear with a "Tags editor".

![Tag edit modal](/docs/it-tags.png)
Tag editor modal

**Hint: use Carbon Modal, Button, inputBox, Tag**

If the user adds one or more tags, they should appear in the table:

![Instance with tag](/docs/it-with-tag.png)
Instance with tag

The tag data should be saved/loaded from `localStorage` .

## Optional Features (Bonus)
The following features are optional, not required. Implement them if you have time.

**1) Table search**

When the user enters text in the search bar, the instances should be filtered accordingly. Search terms should match instance name, user, tags, and status.

![Table search](/docs/it-filtered.png)

**2) Table filtering**

The user can interact with the `status` and `owner` filter dropdowns to filter the table by status or owner. 

The filter options in these dropdowns should be dynamically generated from table data.

![Table filter](/docs/it-owner.png)
Filter by owner

![Table filter by status](/docs/it-status.png)
Filter by status

## Code Requirements

- you must use scss (no styled components or css-in-js)
- use swr (or other method) to revalidate data fetching
- use the Carbon DataTable component to implement the table
- ReactJS (javascript + JSX) + JSDOC. No typescript.


## Evaluation Criteria

- does the table UI update automatically if the table data changes ? 
- did you follow the design / make good UI/UX design decisions when needed?
- code organization & readability
- code completeness and correctness