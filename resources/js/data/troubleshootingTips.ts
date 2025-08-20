import { Monitor, Wifi, FileText, User, RefreshCw, Zap, HardDrive, AlertCircle, Clock, Network } from "lucide-react";

export const troubleshootingTips = [
  {
    category: "Computer Issues",
    icon: Monitor,
    color: "blue",
    tips: [
      { icon: RefreshCw, text: "Restart computer", description: "Fixes issues", color: "green" },
      { icon: Zap, text: "Check cables", description: "Secure connections", color: "yellow" },
      { icon: HardDrive, text: "Close programs", description: "Free memory", color: "purple" }
    ]
  },
  {
    category: "Network Problems",
    icon: Wifi,
    color: "green",
    tips: [
      { icon: RefreshCw, text: "Restart router", description: "Unplug 30s", color: "green" },
      { icon: Wifi, text: "Check WiFi", description: "Verify connection", color: "blue" },
      { icon: Monitor, text: "Try browser", description: "Incognito mode", color: "purple" }
    ]
  },
  {
    category: "Software Problems",
    icon: FileText,
    color: "purple",
    tips: [
      { icon: RefreshCw, text: "Update software", description: "Install updates", color: "green" },
      { icon: FileText, text: "Check permissions", description: "Verify access", color: "blue" },
      { icon: HardDrive, text: "Clear cache", description: "Remove temp files", color: "orange" }
    ]
  },
  {
    category: "Account & Access",
    icon: User,
    color: "red",
    tips: [
      { icon: AlertCircle, text: "Check credentials", description: "Username/password", color: "red" },
      { icon: RefreshCw, text: "Incognito mode", description: "Test browser", color: "green" },
      { icon: Network, text: "Check CBS access", description: "Map network G drive", color: "orange" },
      { icon: Clock, text: "Wait minutes", description: "May resolve", color: "blue" }
    ]
  }
];