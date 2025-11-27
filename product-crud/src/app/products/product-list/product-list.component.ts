import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.loadProducts().subscribe({
      next: () => {
        this.productService.products$.subscribe(p => {
          this.products = p;
          this.loading = false;
        });
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  onAdd() {
    this.router.navigate(['/products/new']);
  }

  onEdit(id?: string) {
    if (!id) return;
    this.router.navigate(['/products/edit', id]);
  }

  onDelete(id?: string) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe();
    }
  }
}
