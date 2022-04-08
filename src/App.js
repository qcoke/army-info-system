import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
import "./App.css";
import ProLayout, {
  PageContainer, ProBreadcrumb
} from "@ant-design/pro-layout";

import TheUserList from "./TheUserList";

function App() {
  return (
    <div className="App">
      <ProLayout
        headerContentRender={() => <ProBreadcrumb />}
        style={{
          height: "100vh",
        }}
        breakpoint={false}
        collapsed
      >
        <PageContainer header={{title: '申请人列表',ghost: true}} className="right-content">
          <TheUserList></TheUserList>
        </PageContainer>
      </ProLayout>
    </div>
  );
}

export default App;
