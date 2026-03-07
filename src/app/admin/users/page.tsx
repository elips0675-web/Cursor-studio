
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_USERS = [
    { id: 1, name: 'Анна', age: 24, img: PlaceHolderImages[0].imageUrl, email: 'anna@example.com', online: true, city: 'Москва', joined: '2024-05-01', bio: 'Люблю закаты, хороший кофе и интересные разговоры.' },
    { id: 2, name: 'Максим', age: 28, img: PlaceHolderImages[1].imageUrl, email: 'maxim@example.com', online: true, city: 'Питер', joined: '2024-05-02', bio: 'Путешественник и фотограф.' },
    { id: 3, name: 'Елена', age: 26, img: PlaceHolderImages[2].imageUrl, email: 'elena@example.com', online: false, city: 'Москва', joined: '2024-04-28', bio: 'Ищу вдохновение в книгах и искусстве.' },
    { id: 4, name: 'Дмитрий', age: 31, img: PlaceHolderImages[3].imageUrl, email: 'dmitry@example.com', online: false, city: 'Казань', joined: '2024-04-25', bio: 'Программист, который любит готовить.' },
    { id: 5, name: 'София', age: 22, img: PlaceHolderImages[4].imageUrl, email: 'sophia@example.com', online: true, city: 'Москва', joined: '2024-05-05', bio: 'Музыка - моя жизнь.' },
    { id: 6, name: 'Артем', age: 25, img: PlaceHolderImages[5].imageUrl, email: 'artem@example.com', online: true, city: 'Питер', joined: '2024-05-04', bio: 'Спорт, технологии и ничего лишнего.' },
    { id: 7, name: 'Мария', age: 29, img: PlaceHolderImages[6].imageUrl, email: 'maria@example.com', online: true, city: 'Москва', joined: '2024-05-03', bio: 'Йога, природа и саморазвитие.' },
];

type User = typeof INITIAL_USERS[0];

export default function AdminUsersPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteUser = (userId: number, userName: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      variant: "destructive",
      title: language === 'RU' ? "Пользователь удален" : "User deleted",
      description: `${userName} ${language === 'RU' ? 'был удален из системы' : 'has been removed'}.`,
    });
  };

  const handleEditClick = (user: User) => {
    setSelectedUser({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? selectedUser : u));
    setIsEditDialogOpen(false);
    toast({
        title: "Пользователь обновлен",
        description: `Данные для ${selectedUser.name} были успешно сохранены.`,
    });
  };

  const usersList = useMemo(() => users, [users]);

  return (
    <>
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-black">{t('admin.users')}</CardTitle>
        <CardDescription>{t('admin.manage_users')}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[80px] sm:table-cell">{t('admin.user_image')}</TableHead>
              <TableHead>{t('admin.user_name')}</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>{t('admin.status')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('admin.city')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('admin.joined')}</TableHead>
              <TableHead className="text-right">{t('admin.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map(user => (
              <TableRow key={user.id} className="group transition-colors">
                <TableCell className="hidden sm:table-cell">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                    <Image
                      alt={user.name}
                      src={user.img}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-bold">{user.name}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.online ? "default" : "outline"} className={user.online ? "bg-[#2ecc71] hover:bg-[#27ae60] text-white border-transparent text-[10px]" : "text-[10px]"}>
                    {user.online ? "Online" : "Offline"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs">{user.city}</TableCell>
                <TableCell className="hidden md:table-cell text-xs opacity-60">{user.joined}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuLabel>{t('admin.actions')}</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => router.push(`/user?id=${user.id}`)}>{t('admin.view_profile')}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClick(user)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteUser(user.id, user.name)} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-muted/5 border-t">
        <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground py-2">
          Total: <strong>{usersList.length}</strong> {language === 'RU' ? 'пользователей' : 'users'}
        </div>
      </CardFooter>
    </Card>

    {selectedUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Редактировать пользователя</DialogTitle>
              <DialogDescription>
                Измените данные для {selectedUser.name}. Нажмите сохранить, когда закончите.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Имя
                </Label>
                <Input
                  id="name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Возраст
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={selectedUser.age}
                  onChange={(e) => setSelectedUser({ ...selectedUser, age: parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  Город
                </Label>
                <Input
                  id="city"
                  value={selectedUser.city}
                  onChange={(e) => setSelectedUser({ ...selectedUser, city: e.target.value })}
                  className="col-span-3"
                />
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="bio" className="text-right pt-2">
                  Био
                </Label>
                <Textarea
                  id="bio"
                  value={selectedUser.bio}
                  onChange={(e) => setSelectedUser({ ...selectedUser, bio: e.target.value })}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSaveUser}>Сохранить изменения</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
