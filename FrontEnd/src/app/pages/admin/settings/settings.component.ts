import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '../../../core/models/store.model';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  public store: Store = { id: '', name: '' };
  public loading = true;
  public error = false;
  public saving = false;
  public saved = false;

  public contact = { phone: '', email: '', address: '', schedule: '' };
  public appearance = { primaryColor: '#212529', secondaryColor: '#6c757d' };
  public social = { facebookUrl: '', instagramUrl: '', tiktokUrl: '', whatsappUrl: '' };
  public socialEnabled = { facebook: false, instagram: false, tiktok: false, whatsapp: false };

  constructor(
    private readonly storeService: StoreService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe({
      next: (response) => {
        this.store = response.data;
        this.contact = {
          phone: this.store.phone ?? '',
          email: this.store.email ?? '',
          address: this.store.address ?? '',
          schedule: this.store.schedule ?? '',
        };
        this.appearance = {
          primaryColor: this.store.primaryColor ?? '#212529',
          secondaryColor: this.store.secondaryColor ?? '#6c757d',
        };
        this.social = {
          facebookUrl: this.store.facebookUrl ?? '',
          instagramUrl: this.store.instagramUrl ?? '',
          tiktokUrl: this.store.tiktokUrl ?? '',
          whatsappUrl: this.store.whatsappUrl ?? '',
        };
        this.socialEnabled = {
          facebook: !!this.store.facebookUrl,
          instagram: !!this.store.instagramUrl,
          tiktok: !!this.store.tiktokUrl,
          whatsapp: !!this.store.whatsappUrl,
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }

  public onStoreInfoSaved(info: { name: string; logoUrl: string }): void {
    this.save({ name: info.name, logoUrl: info.logoUrl });
  }

  public onContactSaved(): void {
    this.save({ ...this.contact });
  }

  public onAppearanceSaved(): void {
    this.save({ ...this.appearance });
  }

  public onSocialToggle(network: keyof typeof this.socialEnabled, enabled: boolean): void {
    this.socialEnabled[network] = enabled;
  }

  public onSocialSaved(): void {
    this.save({
      facebookUrl: this.socialEnabled.facebook ? this.social.facebookUrl : '',
      instagramUrl: this.socialEnabled.instagram ? this.social.instagramUrl : '',
      tiktokUrl: this.socialEnabled.tiktok ? this.social.tiktokUrl : '',
      whatsappUrl: this.socialEnabled.whatsapp ? this.social.whatsappUrl : '',
    });
  }

  private save(changes: Partial<Store>): void {
    this.saving = true;
    this.saved = false;
    this.error = false;

    this.storeService.update(this.store.id, changes).subscribe({
      next: (response) => {
        this.store = response.data;
        this.saving = false;
        this.saved = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.saving = false;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }
}
