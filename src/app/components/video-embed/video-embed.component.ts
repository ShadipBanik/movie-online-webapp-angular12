import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.css']
})
export class VideoEmbedComponent implements OnInit {
  @Input() key: string | null = null;
  @Input() site: string = 'Youtube';
  safeUrlKey: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
  }

  getSafeUrl(url: string) {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.safeUrlKey = safeUrl;
  }
}
