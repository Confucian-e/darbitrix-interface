// import { Checkbox, List } from "antd";

// export default function TokenList({ tokenBalances, onTokenSelect }) {
//   const handleTokenSelect = (token, checked) => {
//     onTokenSelect(token.contractAddress, checked);
//   };

//   return (
//     <List
//       dataSource={tokenBalances}
//       renderItem={(token) => (
//         <List.Item>
//           <Checkbox
//             value={token.contractAddress}
//             onChange={(e) => handleTokenSelect(token, e.target.checked)}
//           >
//             {token.tokenName} ({token.tokenBalance / 10 ** token.tokenDecimal})
//           </Checkbox>
//         </List.Item>
//       )}
//     />
//   );
// }
