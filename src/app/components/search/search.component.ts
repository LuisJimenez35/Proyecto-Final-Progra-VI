import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiServiceService } from '../../services/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private title: Title, private meta: Meta) {
    this.title.setTitle('Search movies - showtime');
    this.meta.updateTag({ name: 'description', content: 'search here movies like avatar, war etc' });
  }

  ngOnInit(): void {
  }

  searchResult: any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    console.log(this.searchForm.value, 'searchform#');
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      console.log(result, 'searchmovie##');
      this.searchResult = result.results;
    });
  }

}

@NgModule({
    declarations: [SearchComponent],
    imports: [ReactiveFormsModule, RouterModule, CommonModule],
    exports: [SearchComponent],
})
export class SearchModule {}
