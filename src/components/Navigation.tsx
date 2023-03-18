import React from "react";

interface NavigationProps {
  account: string;
  setAccount: (_: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ account, setAccount }) => {
  return <nav>{account}</nav>;
};

export default Navigation;
