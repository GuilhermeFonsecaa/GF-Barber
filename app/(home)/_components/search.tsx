"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";

const Search = () => {
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Busque por uma barbearia..." />
            <Button variant="default" size="icon">
                <SearchIcon size={18} />
            </Button>
        </div>
    );
}


export default Search;