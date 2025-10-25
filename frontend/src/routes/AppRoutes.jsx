// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Suspense } from "react";
// import PublicRoute from "./public/PublicRoute";
// import PrivateRoute from "./private/PrivateRoute";
// import publicRoutes from "./public/publicRoutes";
// import privateRoutes from "./private/privateRoutes";
// import NotFound from "@/pages/notfound/NotFound";

// const AppRoutes = () => {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {publicRoutes.map(({ path, element }) => (
//             <Route key={path} path={path} element={<PublicRoute>{element}</PublicRoute>} />
//           ))}
//           {privateRoutes.map(({ path, element }) => (
//             <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
//           ))}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default AppRoutes;