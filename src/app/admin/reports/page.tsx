
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Flag, MoreHorizontal } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const REPORTS_DATA = [
    {
        id: 1,
        reporter: { name: 'Елена', id: 3 },
        reportedUser: { name: 'Дмитрий', id: 4, img: PlaceHolderImages[3].imageUrl },
        reason: 'Фейковый профиль',
        description: 'Фотографии выглядят неестественно, и профиль пустой.',
        date: '2024-05-20',
        status: 'new'
    },
    {
        id: 2,
        reporter: { name: 'София', id: 5 },
        reportedUser: { name: 'Артем', id: 6, img: PlaceHolderImages[5].imageUrl },
        reason: 'Оскорбительное поведение',
        description: 'Использовал грубые выражения в чате.',
        date: '2024-05-19',
        status: 'resolved'
    },
    {
        id: 3,
        reporter: { name: 'Анна', id: 1 },
        reportedUser: { name: 'Никита', id: 10, img: PlaceHolderImages[9].imageUrl },
        reason: 'Спам',
        description: 'Присылает ссылки на сторонние сайты.',
        date: '2024-05-21',
        status: 'new'
    }
];


export default function AdminReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState(REPORTS_DATA);

  const handleUpdateReport = (reportId: number, toastMessage: { title: string; description: string }) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    toast(toastMessage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Жалобы</CardTitle>
        <CardDescription>Просмотр и управление жалобами от пользователей.</CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead className="hidden sm:table-cell">Пожаловался</TableHead>
                <TableHead>Причина</TableHead>
                <TableHead className="hidden md:table-cell">Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>
                  <span className="sr-only">Действия</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Image
                            alt="User avatar"
                            className="aspect-square rounded-full object-cover"
                            height="32"
                            src={report.reportedUser.img}
                            width="32"
                        />
                        <span className="font-medium">{report.reportedUser.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{report.reporter.name}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                  <TableCell>
                    <Badge variant={report.status === 'new' ? 'destructive' : 'outline'} className={report.status !== 'new' ? "bg-green-100 text-green-800 border-green-200" : ""}>
                      {report.status === 'new' ? 'Новая' : 'Решена'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/user?id=${report.reportedUser.id}`)}>Просмотреть профиль</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateReport(report.id, { title: 'Отчет решен', description: 'Статус отчета был изменен.' })}>Отметить как решенный</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUpdateReport(report.id, { title: 'Пользователь заблокирован', description: `${report.reportedUser.name} был заблокирован.` })}>Заблокировать</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateReport(report.id, { title: 'Пользователь удален', description: `${report.reportedUser.name} был удален.` })} className="text-destructive focus:text-destructive">Удалить пользователя</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-center h-64 border-2 border-dashed border-muted rounded-lg">
            <Flag className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">На данный момент активных жалоб нет.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
