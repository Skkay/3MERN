import React, { useState } from "react";
import Card from "../components/Card/Card"

const SearchView = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <form className="mx-3" action="">
        <div class="input-group mb-3">
          <input type="text" class="form-control" onChange={(e) => setSearch(e.target.value)} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Search</button>
          </div>
        </div>
      </form>
      <div className="d-flex flex-wrap">
        <Card />
      </div>
    </div>
  );
};

export default SearchView;
