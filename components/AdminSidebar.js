import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2>Shakti Admin</h2>
      <Link href="/admin/dashboard">Dashboard</Link>
      <Link href="/admin/bookings">Bookings</Link>
      <Link href="/admin/messages">Messages</Link>
      <Link href="/admin/users">Users</Link>
      <Link href="/admin/services">Services</Link>
      <Link href="/admin/gallery">Gallery</Link>
      <Link href="/admin/logout">Logout</Link>
    </div>
  );
}
