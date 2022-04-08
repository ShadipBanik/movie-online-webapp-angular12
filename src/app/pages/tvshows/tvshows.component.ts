import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { Paginator } from 'primeng/paginator';
import { take } from 'rxjs/operators';
import { tv } from 'src/app/models/tv';
import { TvService } from 'src/app/sevices/tv.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit {
  @ViewChild('p', { static: false }) paginator!: Paginator;
  tvshows: tv[] = [];
  paginate: any;
  movieType: string = 'popular';
  genreId: number | null = null;
  totalRecords: number | null = null;
  searchText: string | null = null;
  items: MenuItem[] = [];
  constructor(private tvService: TvService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvByGenre(genreId, 1);
      } else {
        this.getAllTv(1, this.movieType);
      }
    });
    this.items = [
      {
        label: 'Popular',
        command: () => {
          this.movieType = 'popular';
          this.searchText = null;
          this.paginator.changePageToFirst(event);
          this.getAllTv(1, 'popular');
        }
      },
      {
        label: 'Top Rated',
        command: () => {
          this.movieType = 'top_rated';
          this.searchText = null;
          this.paginator.changePageToFirst(event);
          this.getAllTv(1, 'top_rated');
        }
      }
    ];
  }
  getAllTv(page: number, type: string, searchValue?: string) {
    this.tvService.searchTvShows(page, type, searchValue).subscribe((res) => {
      this.totalRecords = res.total_results;
      this.tvshows = res.results;
    });
  }
  pagenate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getTvByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchText) {
        this.getAllTv(pageNumber, 'popular', this.searchText);
      } else {
        this.getAllTv(pageNumber, this.movieType);
      }
    }
  }
  getTvByGenre(genreId: number, page: number) {
    this.tvService.getTvsByGenre(genreId, page).subscribe((res) => {
      this.totalRecords = res.total_results;
      this.tvshows = res.results;
    });
  }

  searchKey(event: any) {
    this.paginator.changePageToFirst(event);
    this.searchText = event.target.value;
    this.getAllTv(1, 'popular', event.target.value);
  }
}
