This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
```
import React from 'react';
import { Select } from 'antd';

const TagSelect = ({
  label = "Business",
  options = [],
  defaultValue = ["BusinessABanking", "Tag"],
  placeholder = "Please select",
  width = 480,
  onChange,
  value,
  ...rest // Allows for additional Ant Design props like allowClear, disabled, etc.
}) => {
  return (
    <div>
      {label && (
        <label className="lmn-form-label lmn-d-block">
          {label}
        </label>
      )}
      <Select
        mode="tags"
        placeholder={placeholder}
        style={{ width }}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        // Ensures the dropdown attaches to your specific app container
        getPopupContainer={() => document.querySelector("#app-content") || document.body}
        {...rest}
      >
        {options.map((item) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default TagSelect;

----------------

 // Helper for Checkbox State
  const c = (checked, style = "", extra = {}) => ({ checked, style, ...extra });

  const rowData = useMemo(
    () => [
      // --- 1. BANKING (Detailed to match the image exactly) ---
      {
        path: ["Banking"],
        type: "business",
        name: "Banking",
        activeAccess: 46,
        dsCount: "2 / 3",
        streamCount: "7 / 16",
        read: "7 / 16",
        write: "4 / 16",
        admin: "1 / 16",
        delegate: "2 / 16",
      },
      {
        path: ["Banking", "DataSet1"],
        type: "dataset",
        name: "Data Set1",
        streamList: "Data Stream1, Data Stream2, Data...",
      },
      {
        path: ["Banking", "DataSet1", "DataStream1"],
        type: "stream",
        name: "Data Stream1",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet1", "DataStream2"],
        type: "stream",
        name: "Data Stream2",
        read: c(true),
        write: c(true, "blue-box"),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet1", "DataStream3"],
        type: "stream",
        name: "Data Stream3",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet2"],
        type: "dataset",
        name: "Data Set2",
        streamList: "Data Stream4, Data Stream5, Data...",
      },
      {
        path: ["Banking", "DataSet2", "DataStream4"],
        type: "stream",
        name: "Data Stream4",
        read: c(true),
        write: c(true, "", { avatar: true }),
        admin: c(true, "", { cl: "6 CL" }),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet2", "DataStream5"],
        type: "stream",
        name: "Data Stream5",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet2", "DataStream6"],
        type: "stream",
        name: "Data Stream6",
        read: c(true),
        write: c(false, "red-box"),
        admin: c(true, "blue-box"),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet2", "DataStream7"],
        type: "stream",
        name: "Data Stream7",
        read: c(true),
        write: c(true),
        admin: c(false),
        delegate: c(true, "blue-box"),
      },
      {
        path: ["Banking", "DataSet2", "DataStream8"],
        type: "stream",
        name: "Data Stream8",
        read: c(false, "red-box"),
        write: c(false, "red-box"),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Banking", "DataSet3"],
        type: "dataset",
        name: "Data Set3",
        streamList: "Data Stream9, Data Stream10, Dat...",
      },
      {
        path: ["Banking", "DataSet3", "DataStream9"],
        type: "stream",
        name: "Data Stream9",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 2. MARKETS ---
      {
        path: ["Markets"],
        type: "business",
        name: "Markets",
        activeAccess: 100,
        dsCount: "1 / 1",
        streamCount: "5 / 5",
        read: "5 / 5",
        write: "3 / 5",
        admin: "1 / 5",
        delegate: "0 / 5",
      },
      {
        path: ["Markets", "MktDataSet1"],
        type: "dataset",
        name: "Market Data Set 1",
        streamList: "Equities, FX, Rates...",
      },
      {
        path: ["Markets", "MktDataSet1", "Stream1"],
        type: "stream",
        name: "Equities Stream",
        read: c(true),
        write: c(true),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Markets", "MktDataSet1", "Stream2"],
        type: "stream",
        name: "FX Stream",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 3. SERVICES ---
      {
        path: ["Services"],
        type: "business",
        name: "Services",
        activeAccess: 20,
        dsCount: "1 / 1",
        streamCount: "2 / 2",
        read: "1 / 2",
        write: "1 / 2",
        admin: "0 / 2",
        delegate: "0 / 2",
      },
      {
        path: ["Services", "SvcDataSet1"],
        type: "dataset",
        name: "Service Data Set 1",
        streamList: "Payments, Clearing...",
      },
      {
        path: ["Services", "SvcDataSet1", "Stream1"],
        type: "stream",
        name: "Payments Stream",
        read: c(true),
        write: c(true),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Services", "SvcDataSet1", "Stream2"],
        type: "stream",
        name: "Clearing Stream",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 4. FINANCES ---
      {
        path: ["Finances"],
        type: "business",
        name: "Finances",
        activeAccess: 0,
        dsCount: "0 / 1",
        streamCount: "0 / 2",
        read: "0 / 2",
        write: "0 / 2",
        admin: "0 / 2",
        delegate: "0 / 2",
      },
      {
        path: ["Finances", "FinDataSet1"],
        type: "dataset",
        name: "Finance Data Set 1",
        streamList: "Ledger, Payroll...",
      },
      {
        path: ["Finances", "FinDataSet1", "Stream1"],
        type: "stream",
        name: "Ledger Stream",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Finances", "FinDataSet1", "Stream2"],
        type: "stream",
        name: "Payroll Stream",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 5. GLOBAL FUNCTIONS ---
      {
        path: ["Global Functions"],
        type: "business",
        name: "Global Functions",
        activeAccess: 50,
        dsCount: "1 / 1",
        streamCount: "1 / 1",
        read: "1 / 1",
        write: "0 / 1",
        admin: "0 / 1",
        delegate: "0 / 1",
      },
      {
        path: ["Global Functions", "GFDataSet1"],
        type: "dataset",
        name: "GF Data Set 1",
        streamList: "HR, Risk...",
      },
      {
        path: ["Global Functions", "GFDataSet1", "Stream1"],
        type: "stream",
        name: "HR Data Stream",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 6. ISG ---
      {
        path: ["ISG"],
        type: "business",
        name: "ISG",
        activeAccess: 80,
        dsCount: "1 / 1",
        streamCount: "2 / 2",
        read: "2 / 2",
        write: "1 / 2",
        admin: "1 / 2",
        delegate: "0 / 2",
      },
      {
        path: ["ISG", "ISGDataSet1"],
        type: "dataset",
        name: "ISG Data Set 1",
        streamList: "Internal Data 1, Internal Data 2...",
      },
      {
        path: ["ISG", "ISGDataSet1", "Stream1"],
        type: "stream",
        name: "Internal Data 1",
        read: c(true),
        write: c(true),
        admin: c(true),
        delegate: c(false),
      },
      {
        path: ["ISG", "ISGDataSet1", "Stream2"],
        type: "stream",
        name: "Internal Data 2",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 7. LOANS ---
      {
        path: ["Loans"],
        type: "business",
        name: "Loans",
        activeAccess: 10,
        dsCount: "1 / 1",
        streamCount: "1 / 2",
        read: "1 / 2",
        write: "0 / 2",
        admin: "0 / 2",
        delegate: "0 / 2",
      },
      {
        path: ["Loans", "LoanDataSet1"],
        type: "dataset",
        name: "Mortgage Data Set",
        streamList: "Retail Mortgages...",
      },
      {
        path: ["Loans", "LoanDataSet1", "Stream1"],
        type: "stream",
        name: "Retail Mortgages",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["Loans", "LoanDataSet1", "Stream2"],
        type: "stream",
        name: "Commercial Loans",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 8. PBWM ---
      {
        path: ["PBWM"],
        type: "business",
        name: "PBWM",
        activeAccess: 30,
        dsCount: "1 / 1",
        streamCount: "2 / 2",
        read: "2 / 2",
        write: "1 / 2",
        admin: "0 / 2",
        delegate: "0 / 2",
      },
      {
        path: ["PBWM", "PBWMDataSet1"],
        type: "dataset",
        name: "Wealth Data Set",
        streamList: "Portfolios, Assets...",
      },
      {
        path: ["PBWM", "PBWMDataSet1", "Stream1"],
        type: "stream",
        name: "Portfolios Stream",
        read: c(true),
        write: c(true),
        admin: c(false),
        delegate: c(false),
      },
      {
        path: ["PBWM", "PBWMDataSet1", "Stream2"],
        type: "stream",
        name: "Assets Stream",
        read: c(true),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 9. EXTERNAL TO CITI ---
      {
        path: ["External to Citi"],
        type: "business",
        name: "External to Citi",
        activeAccess: 0,
        dsCount: "0 / 1",
        streamCount: "0 / 1",
        read: "0 / 1",
        write: "0 / 1",
        admin: "0 / 1",
        delegate: "0 / 1",
      },
      {
        path: ["External to Citi", "ExtDataSet1"],
        type: "dataset",
        name: "Vendor Data Set",
        streamList: "Vendor Feeds...",
      },
      {
        path: ["External to Citi", "ExtDataSet1", "Stream1"],
        type: "stream",
        name: "Vendor Feeds",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },

      // --- 10. OTHERS ---
      {
        path: ["Others"],
        type: "business",
        name: "Others",
        activeAccess: 0,
        dsCount: "0 / 1",
        streamCount: "0 / 1",
        read: "0 / 1",
        write: "0 / 1",
        admin: "0 / 1",
        delegate: "0 / 1",
      },
      {
        path: ["Others", "OtherDataSet1"],
        type: "dataset",
        name: "Misc Data Set",
        streamList: "Misc Stream...",
      },
      {
        path: ["Others", "OtherDataSet1", "Stream1"],
        type: "stream",
        name: "Misc Stream",
        read: c(false),
        write: c(false),
        admin: c(false),
        delegate: c(false),
      },
    ],
    []
  );
 

