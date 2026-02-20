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
import React, { useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

// --- Helper for Checkbox State ---
const c = (checked, style = "", extra = {}) => ({ checked, style, ...extra });

// --- 1. Custom Renderers ---

// Col 1: Expands "Banking", "Markets"
const BusinessNameRenderer = (params) => {
  if (params.data?.type === "business") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          fontWeight: 600,
          color: "#333",
        }}
        onClick={() => params.node.setExpanded(!params.node.expanded)}
      >
        <span
          style={{
            marginRight: "10px",
            fontSize: "18px",
            display: "inline-block",
            transform: params.node.expanded ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
            width: "10px",
          }}
        >
          ›
        </span>
        <span>{params.data.name}</span>
      </div>
    );
  }
  return null; // Empty for sub-levels
};

// Col 2: Progress Bar
const ProgressBarRenderer = (params) => {
  if (params.data?.type === "business") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "10px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "8px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${params.data.activeAccess}%`,
              height: "100%",
              backgroundColor: "#2e7d32",
              borderRadius: "4px",
            }}
          />
        </div>
        <span style={{ fontSize: "12px", color: "#333" }}>
          {params.data.activeAccess}%
        </span>
      </div>
    );
  }
  return null;
};

// Col 3: Expands "Data Set1", "Data Set2"
const DataSetsRenderer = (params) => {
  if (params.data?.type === "business")
    return <span style={{ color: "#333" }}>{params.data.dsCount}</span>;
  if (params.data?.type === "dataset") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "#333",
        }}
        onClick={() => params.node.setExpanded(!params.node.expanded)}
      >
        <span
          style={{
            marginRight: "10px",
            fontSize: "18px",
            display: "inline-block",
            transform: params.node.expanded ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
            width: "10px",
          }}
        >
          ›
        </span>
        <span>{params.data.name}</span>
      </div>
    );
  }
  return null;
};

// Col 4: Shows lists and Stream names
const DataStreamsRenderer = (params) => {
  if (params.data?.type === "business")
    return <span style={{ color: "#333" }}>{params.data.streamCount}</span>;
  if (params.data?.type === "dataset")
    return (
      <span style={{ color: "#999", fontSize: "12px" }}>
        {params.data.streamList}
      </span>
    );
  if (params.data?.type === "stream")
    return <span style={{ color: "#333" }}>{params.data.name}</span>;
  return null;
};

// Cols 5-8: Complex Checkbox Logic matching the red/blue outlines and avatars
const CheckboxCellRenderer = (params) => {
  const { data, colDef } = params;
  if (!data) return null;
  const state = data[colDef.field];

  if (data.type === "business")
    return <span style={{ fontSize: "12px", color: "#333" }}>{state}</span>;
  if (data.type === "dataset") return null; // Row background handles the gray area

  if (data.type === "stream" && state) {
    const boxStyle = {
      display: "flex",
      alignItems: "center",
      height: "100%",
      width: "100%",
      padding: "0 10px",
      gap: "8px",
      boxSizing: "border-box",
      border:
        state.style === "blue-box"
          ? "1.5px solid #1a73e8"
          : state.style === "red-box"
          ? "1.5px solid #d93025"
          : "none",
      backgroundColor:
        state.style === "blue-box"
          ? "#f1f6fe"
          : state.style === "red-box"
          ? "#fce8e6"
          : "transparent",
    };

    const checkedBox = (
      <div
        style={{
          width: "14px",
          height: "14px",
          backgroundColor: "#1a73e8",
          borderRadius: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    );
    const uncheckedBox = (
      <div
        style={{
          width: "14px",
          height: "14px",
          border:
            state.style === "red-box"
              ? "1.5px solid #d93025"
              : "1.5px solid #ccc",
          borderRadius: "3px",
          backgroundColor: "white",
        }}
      />
    );

    return (
      <div style={boxStyle}>
        {state.checked ? checkedBox : uncheckedBox}
        {state.avatar && (
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="avatar"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
        )}
        {state.cl && (
          <span
            style={{
              backgroundColor: "#6a1b9a",
              color: "white",
              fontSize: "10px",
              padding: "2px 6px",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
          >
            {state.cl}
          </span>
        )}
      </div>
    );
  }
  return null;
};

const CheckboxHeader = (props) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <input
      type="checkbox"
      style={{ width: "14px", height: "14px", cursor: "pointer" }}
    />
    <span style={{ fontSize: "12px", fontWeight: "bold", color: "#333" }}>
      {props.displayName}
    </span>
  </div>
);

// --- MAIN COMPONENT ---
export default function App() {
  const gridRef = useRef();

  const rowData = useMemo(
    () => [
      // --- 1. BANKING (3 Data Sets, 16 Streams Total) ---
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

      // Data Set 1 (Streams 1-3)
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

      // Data Set 2 (Streams 4-8)
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

      // Data Set 3 (Collapsed in the image, contains Streams 9-16)
      // We add one stream with a "Read" check here, which brings the total visible Read checks up to exactly 7/16!
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
      {
        path: ["Banking", "DataSet3", "DataStream10"],
        type: "stream",
        name: "Data Stream10",
        read: c(false),
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
        read: "",
        write: "",
        admin: "",
        delegate: "",
      },

      // --- OTHER BUSINESSES ---
      { path: ["Services"], type: "business", name: "Services" },
      { path: ["Finances"], type: "business", name: "Finances" },
      {
        path: ["Global Functions"],
        type: "business",
        name: "Global Functions",
      },
      { path: ["ISG"], type: "business", name: "ISG" },
      { path: ["Loans"], type: "business", name: "Loans" },
      { path: ["PBWM"], type: "business", name: "PBWM" },
      {
        path: ["External to Citi"],
        type: "business",
        name: "External to Citi",
      },
      { path: ["Others"], type: "business", name: "Others" },
    ],
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "name",
        headerName: "Business Name",
        cellRenderer: BusinessNameRenderer,
        flex: 1.2,
      },
      {
        field: "activeAccess",
        headerName: "Active Access %",
        cellRenderer: ProgressBarRenderer,
        flex: 1,
      },
      {
        field: "dsCount",
        headerName: "Data Sets",
        cellRenderer: DataSetsRenderer,
        flex: 1,
      },
      {
        field: "streamCount",
        headerName: "Data Streams & Delegation",
        cellRenderer: DataStreamsRenderer,
        flex: 1.5,
      },
      {
        field: "read",
        headerName: "Read",
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCellRenderer,
        width: 85,
        cellStyle: { padding: 0 },
      },
      {
        field: "write",
        headerName: "Write",
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCellRenderer,
        width: 95,
        cellStyle: { padding: 0 },
      },
      {
        field: "admin",
        headerName: "Admin",
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCellRenderer,
        width: 95,
        cellStyle: { padding: 0 },
      },
      {
        field: "delegate",
        headerName: "Delegate",
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCellRenderer,
        width: 100,
        cellStyle: { padding: 0 },
      },
    ],
    []
  );

  // 4. Gray background for Dataset rows
  const getRowStyle = (params) => {
    if (params.data?.type === "dataset") {
      return { backgroundColor: "#f0f2f5" };
    }
    return null;
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fff",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          style={{
            padding: "10px 15px",
            width: "280px",
            borderRadius: "25px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={() => gridRef.current.api.expandAll()}
            style={{
              background: "none",
              border: "none",
              color: "#1a73e8",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Expand All
          </button>
          <button
            style={{
              border: "1px solid #1a73e8",
              color: "#1a73e8",
              padding: "10px 25px",
              borderRadius: "25px",
              background: "white",
              fontWeight: "bold",
            }}
          >
            Delegate
          </button>
          <button
            style={{
              backgroundColor: "#1a73e8",
              color: "white",
              padding: "10px 25px",
              borderRadius: "25px",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Apply Access Changes
          </button>
        </div>
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: "750px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          treeData={true}
          groupDisplayType="custom" // MAGIC SETTING: Prevents AG Grid from forcing a default group column
          getDataPath={(d) => d.path}
          groupDefaultExpanded={0} // Expand all to match image
          rowHeight={45}
          headerHeight={50}
          getRowStyle={getRowStyle}
          suppressRowClickSelection={true}
        />
      </div>

      <style>{`
        .ag-theme-alpine {
            --ag-header-background-color: #fff;
            --ag-header-foreground-color: #333;
            --ag-border-color: #eee;
            --ag-row-hover-color: transparent; 
        }
        .ag-header { border-bottom: 1px solid #eee !important; }
        .ag-row { border-bottom: 1px solid #f9f9f9 !important; }
        /* Remove borders from the checkbox cells to keep it clean */
        .ag-cell { border-right: none !important; } 
      `}</style>
    </div>
  );
}

