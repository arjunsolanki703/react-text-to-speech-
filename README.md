# Project Name: React TypeScript Vite - Speech to Text

## Installtion

Follow these steps to set up the project on your local machine:

1. Install the required packages by running the following command in your terminal:
   ```
	 npm install
	 ```

2. Start the development server using the following command:
   ```
	 npm run dev
	 ```

## Folder Structure

The project follows a structured layout to maintain code organization:

- /src: Main source code directory.
   - /assets: Contains project assets such as images, fonts, etc.
   - /components: Houses React components used in the project.
   - /providers: Holds context providers organized by page, facilitating easy state sharing across components within those pages.
   - /types: Contains TypeScript type definitions for the project.

---

#### /components Structure
The /components directory initially had three subdirectories (elements, utils, layouts), but for the current development phase, only two components are being used. These components are defined directly within the /components directory.

---

#### /providers Usage
The /providers directory contains context providers that correspond to specific pages. This approach helps prevent prop drilling by allowing components within a given page to access the shared state directly.

## License
This project is licensed under the MIT License.