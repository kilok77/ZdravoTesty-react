import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import React from "react";

import First from "./pages/First";
import Overview from "./pages/Overview";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Exam from "./pages/Exam";
import Results from "./pages/Results";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import History from "./pages/History";
// import Selection from "./pages/Selection";
import Selection from "./pages/Selection";
import Areas from "./pages/Areas";
import Create from "./pages/Create";
import Questions from "./pages/Questions";

import { action as loginAction } from "./pages/Login";
import { action as registrationAction } from "./pages/Registration";
import { action as logoutAction } from "./pages/Profile";
import { action as bugAction } from "./pages/Info";
import { action as resultAction } from "./pages/Results";
import { viewAction as viewResultAction } from "./pages/Results";
import { action as examAction } from "./pages/Exam";
import { viewAction as viewExamAction } from "./pages/Exam";
import { action as selectionAction } from "./pages/Selection";
import { action as questionsAction } from "./pages/Questions";

import { loader as statisticLoader } from "./pages/Overview";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import { loader as profilLoader } from "./pages/Profile";
import { loader as examsLoader } from "./pages/Exam";
import { viewLoader as viewExamLoader } from "./pages/Exam";
import { loader as resultsLoader } from "./pages/Results";
import { loader as historyLoader } from "./pages/History";
import { loader as areasLoader } from "./pages/Areas";
// import { loader as selectionLoader } from "./pages/Selection";
import { loader as selectionLoader } from "./pages/Selection";
import { loader as questionsLoader } from "./pages/Questions";

import DataContext from "./store/data-context";

import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { path: "/", element: <First /> },
      { path: "/login", element: <Login />, action: loginAction },
      {
        path: "/registration",
        element: <Registration />,
        action: registrationAction,
      },
      {
        path: "/view/:ids",
        loader: viewExamLoader,
        action: viewExamAction,
        element: <Exam></Exam>,
      },
      {
        path: "view/results",
        action: viewResultAction,
        loader: resultsLoader,
        element: <Results></Results>,
      },
      {
        path: "/menu",
        element: <Nav />,
        loader: checkAuthLoader,
        children: [
          {
            path: "/menu/overview",
            loader: checkAuthLoader,
            children: [
              {
                path: "/menu/overview",
                loader: statisticLoader,
                element: <Overview />,
              },
            ],
          },
          {
            path: "/menu/create",
            element: <Create />,
          },
          {
            path: "/menu/questions",
            element: <Questions />,
            loader: questionsLoader,
          },
          {
            path: "/menu/areas",
            loader: checkAuthLoader,
            children: [
              {
                path: "/menu/areas",
                loader: areasLoader,
                element: <Areas />,
              },
            ],
          },
          {
            path: "/menu/selection",
            loader: checkAuthLoader,
            children: [
              {
                path: "/menu/selection",
                loader: selectionLoader,
                element: <Selection />,
                // action: selectionAction,
              },
            ],
          },
          {
            path: "/menu/info",
            loader: checkAuthLoader,
            element: <Info />,
            action: bugAction,
          },
          {
            path: "/menu/profile",
            loader: checkAuthLoader,
            children: [
              {
                loader: profilLoader,
                path: "/menu/profile",
                element: <Profile />,
                action: logoutAction,
              },
            ],
          },
          {
            path: "/menu/exams",
            loader: checkAuthLoader,
            children: [
              {
                path: "/menu/exams",
                loader: examsLoader,
                action: examAction,
                element: <Exam />,
              },
            ],
          },
          {
            path: "/menu/results",
            loader: checkAuthLoader,
            children: [
              {
                path: "/menu/results",
                loader: resultsLoader,
                action: resultAction,
                element: <Results />,
              },
            ],
          },
          {
            path: "/menu/history",
            loader: checkAuthLoader,
            children: [
              {
                element: <History />,
                path: ":page",
                loader: historyLoader,
                action: examAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
