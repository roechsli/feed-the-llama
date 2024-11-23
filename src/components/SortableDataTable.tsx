"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SortKey = "word" | "guess" | "occurrence";

export default function SortableDataTable() {
  const [data] = useLocalStorage("statistics");
  const [sortKey, setSortKey] = useState<SortKey>("occurrence");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            {["word", "guess", "occurrence"].map((key) => (
              <TableHead key={key}>
                <Button
                  variant="ghost"
                  onClick={() => handleSort(key as SortKey)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.word}</TableCell>
              <TableCell>{item.guess}</TableCell>
              <TableCell>{item.occurrence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
