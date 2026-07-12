from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(help_text='e.g., USD, EUR, INR', max_length=3, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('symbol', models.CharField(max_length=10)),
                ('exchange_rate_to_base', models.DecimalField(decimal_places=6, default=1.0, max_digits=20)),
                ('is_base', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        # Abridged for foundation initialization
    ]
