import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";
import { searchSchoolService } from "@/services/schoolService";
import { useToast } from "@/hooks/use-toast";

export const SchoolCombobox = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSchools = async () => {
      if (debouncedSearchQuery.length >= 3) {
        const result = await searchSchoolService(debouncedSearchQuery);
        if (result.success) {
          setSchools(result.data.map((school) => school.schoolName));
        } else {
          toast.error("Error", { description: result.error });
          setSchools([]);
        }
      } else {
        setSchools([]);
      }
    };
    fetchSchools();
  }, [debouncedSearchQuery, toast]);

  return (
   <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-11 justify-between pl-11"
        >
          {/* <Building2 className="absolute left-3 h-5 w-5 text-muted-foreground" /> */}
          {value || "Select school..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search school..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>No school found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {schools.map((school) => (
              <CommandItem
                key={school}
                value={school}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === school ? "opacity-100" : "opacity-0"
                  )}
                />
                {school}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};