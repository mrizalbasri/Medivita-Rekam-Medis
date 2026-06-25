import { QrCode, User, History, Lock, X, Calendar, Bell, Settings, Scan, Download, Printer, Search, LogOut } from "lucide-react";

export const QrIcon = ({ className = "h-5 w-5" }: { className?: string }) => <QrCode className={className} />;
export const SearchIcon = ({ className = "h-5 w-5" }: { className?: string }) => <Search className={className} />;
export const ProfileIcon = ({ className = "h-5 w-5" }: { className?: string }) => <User className={className} />;
export const HistoryIcon = ({ className = "h-5 w-5" }: { className?: string }) => <History className={className} />;
export const LockIcon = ({ className = "h-5 w-5" }: { className?: string }) => <Lock className={className} />;
export const CancelIcon = ({ className = "h-5 w-5" }: { className?: string }) => <X className={className} />;
export const CalendarIcon = ({ className = "h-4 w-4" }: { className?: string }) => <Calendar className={className} />;
export const BellIcon = ({ className = "h-5 w-5" }: { className?: string }) => <Bell className={className} />;
export const SettingsIcon = ({ className = "h-5 w-5" }: { className?: string }) => <Settings className={className} />;
export const ScanIcon = ({ className = "h-4 w-4" }: { className?: string }) => <Scan className={className} />;
export const DownloadIcon = ({ className = "h-4 w-4" }: { className?: string }) => <Download className={className} />;
export const PrinterIcon = ({ className = "h-4 w-4" }: { className?: string }) => <Printer className={className} />;
export const LogoutIcon = ({ className = "h-5 w-5" }: { className?: string }) => <LogOut className={className} />;

