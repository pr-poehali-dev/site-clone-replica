import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const [calculatorData, setCalculatorData] = useState({
    cargoType: "",
    weight: "",
    loading: "",
    cityFrom: "",
    cityTo: ""
  });

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const cities = [
    { value: "moscow", label: "Москва", distance: 0 },
    { value: "spb", label: "Санкт-Петербург", distance: 700 },
    { value: "kazan", label: "Казань", distance: 800 },
    { value: "nnovgorod", label: "Нижний Новгород", distance: 420 },
    { value: "ekb", label: "Екатеринбург", distance: 1800 },
    { value: "novosibirsk", label: "Новосибирск", distance: 3300 },
    { value: "samara", label: "Самара", distance: 1000 },
    { value: "omsk", label: "Омск", distance: 2700 },
    { value: "chelyabinsk", label: "Челябинск", distance: 1900 },
    { value: "rostov", label: "Ростов-на-Дону", distance: 1100 },
    { value: "ufa", label: "Уфа", distance: 1350 },
    { value: "krasnoyarsk", label: "Красноярск", distance: 4200 },
    { value: "voronezh", label: "Воронеж", distance: 520 },
    { value: "perm", label: "Пермь", distance: 1400 },
    { value: "volgograd", label: "Волгоград", distance: 950 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const calculatePrice = () => {
    const weight = parseFloat(calculatorData.weight) || 0;
    
    const cityFromData = cities.find(c => c.value === calculatorData.cityFrom);
    const cityToData = cities.find(c => c.value === calculatorData.cityTo);
    
    if (!cityFromData || !cityToData) {
      alert("Пожалуйста, выберите города отправления и назначения");
      return;
    }
    
    const distance = Math.abs(cityFromData.distance - cityToData.distance);
    
    let baseRate = 50;
    if (calculatorData.cargoType === "standard") baseRate = 50;
    if (calculatorData.cargoType === "fragile") baseRate = 70;
    if (calculatorData.cargoType === "oversized") baseRate = 90;
    
    let loadingCost = 0;
    if (calculatorData.loading === "yes") loadingCost = 3000;
    
    const totalPrice = (weight * baseRate) + (distance * 30) + loadingCost;
    setCalculatedPrice(Math.round(totalPrice));
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">СпецТранс</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#about" className="hover:text-primary transition-colors">О компании</a>
              <a href="#advantages" className="hover:text-primary transition-colors">Преимущества</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button className="hidden md:inline-flex">
              <Icon name="Phone" size={18} className="mr-2" />
              Заказать звонок
            </Button>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Грузоперевозки по всей России
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Надежная транспортная компания с опытом работы более 15 лет. 
                Гарантируем безопасность и своевременную доставку грузов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg">
                      <Icon name="Calculator" size={20} className="mr-2" />
                      Рассчитать стоимость
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Калькулятор стоимости</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Город отправления</label>
                        <Popover open={openFrom} onOpenChange={setOpenFrom}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openFrom}
                              className="w-full justify-between"
                            >
                              {calculatorData.cityFrom
                                ? cities.find((city) => city.value === calculatorData.cityFrom)?.label
                                : "Выберите город..."}
                              <Icon name="ChevronsUpDown" size={16} className="ml-2 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="Поиск города..." />
                              <CommandList>
                                <CommandEmpty>Город не найден.</CommandEmpty>
                                <CommandGroup>
                                  {cities.map((city) => (
                                    <CommandItem
                                      key={city.value}
                                      value={city.label}
                                      onSelect={() => {
                                        setCalculatorData({...calculatorData, cityFrom: city.value});
                                        setOpenFrom(false);
                                      }}
                                    >
                                      <Icon
                                        name="Check"
                                        size={16}
                                        className={calculatorData.cityFrom === city.value ? "opacity-100 mr-2" : "opacity-0 mr-2"}
                                      />
                                      {city.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Город назначения</label>
                        <Popover open={openTo} onOpenChange={setOpenTo}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openTo}
                              className="w-full justify-between"
                            >
                              {calculatorData.cityTo
                                ? cities.find((city) => city.value === calculatorData.cityTo)?.label
                                : "Выберите город..."}
                              <Icon name="ChevronsUpDown" size={16} className="ml-2 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="Поиск города..." />
                              <CommandList>
                                <CommandEmpty>Город не найден.</CommandEmpty>
                                <CommandGroup>
                                  {cities.map((city) => (
                                    <CommandItem
                                      key={city.value}
                                      value={city.label}
                                      onSelect={() => {
                                        setCalculatorData({...calculatorData, cityTo: city.value});
                                        setOpenTo(false);
                                      }}
                                    >
                                      <Icon
                                        name="Check"
                                        size={16}
                                        className={calculatorData.cityTo === city.value ? "opacity-100 mr-2" : "opacity-0 mr-2"}
                                      />
                                      {city.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Тип груза</label>
                        <Select value={calculatorData.cargoType} onValueChange={(value) => setCalculatorData({...calculatorData, cargoType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип груза" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Стандартный груз</SelectItem>
                            <SelectItem value="fragile">Хрупкий груз</SelectItem>
                            <SelectItem value="oversized">Негабаритный груз</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Вес груза (кг)</label>
                        <Input 
                          type="number" 
                          placeholder="1000"
                          value={calculatorData.weight}
                          onChange={(e) => setCalculatorData({...calculatorData, weight: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Погрузка/разгрузка</label>
                        <Select value={calculatorData.loading} onValueChange={(value) => setCalculatorData({...calculatorData, loading: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Требуется ли погрузка?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">Не требуется</SelectItem>
                            <SelectItem value="yes">Требуется (+ 3000 ₽)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={calculatePrice} className="w-full" size="lg">
                        <Icon name="Calculator" size={20} className="mr-2" />
                        Рассчитать
                      </Button>
                      {calculatedPrice !== null && (
                        <Card className="bg-primary/10 border-primary">
                          <CardContent className="p-6 text-center">
                            <div className="text-sm text-muted-foreground mb-2">Предварительная стоимость:</div>
                            <div className="text-4xl font-bold text-primary">{calculatedPrice.toLocaleString()} ₽</div>
                            <div className="text-xs text-muted-foreground mt-2">Точная стоимость рассчитывается индивидуально</div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="text-lg" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
                  <Icon name="FileText" size={20} className="mr-2" />
                  Наши услуги
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">клиентов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/fbc8dd3a-3f49-4c7a-b8b3-79fb7f2b041f/files/da71cb6f-4d3d-4547-af59-159f31f98f28.jpg"
                alt="Грузовой транспорт"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр транспортно-логистических услуг для вашего бизнеса
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Truck",
                title: "Грузоперевозки",
                description: "Перевозка грузов любой сложности по России и СНГ. Автопарк более 100 единиц техники."
              },
              {
                icon: "Package",
                title: "Складская логистика",
                description: "Современные складские комплексы с системой учета и контроля хранения товаров."
              },
              {
                icon: "Globe",
                title: "Международные перевозки",
                description: "Доставка грузов в страны Европы и Азии с полным таможенным сопровождением."
              },
              {
                icon: "Container",
                title: "Контейнерные перевозки",
                description: "Транспортировка контейнеров всех типов с соблюдением температурного режима."
              },
              {
                icon: "Settings",
                title: "Спецтехника",
                description: "Перевозка негабаритных и тяжеловесных грузов на специализированном транспорте."
              },
              {
                icon: "Clock",
                title: "Срочная доставка",
                description: "Экспресс-доставка грузов в кратчайшие сроки по всей территории России."
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://cdn.poehali.dev/projects/fbc8dd3a-3f49-4c7a-b8b3-79fb7f2b041f/files/1ecdc843-373c-4af9-b141-0e97dce91b63.jpg"
                alt="Складской комплекс"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">О компании СпецТранс</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы работаем на рынке транспортных услуг с 2008 года и за это время 
                зарекомендовали себя как надежный партнер для крупных и малых предприятий.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Наша компания специализируется на грузоперевозках различной сложности, 
                предоставляя клиентам качественный сервис и индивидуальный подход.
              </p>
              <div className="space-y-4">
                {[
                  "Собственный автопарк из 100+ единиц техники",
                  "Складские комплексы общей площадью 10 000 м²",
                  "Профессиональные водители с опытом от 5 лет",
                  "Страхование грузов и полная ответственность",
                  "Система GPS-мониторинга транспорта 24/7"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="advantages" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: "Shield",
                title: "Надежность",
                description: "100% выполнение обязательств и полное страхование грузов"
              },
              {
                icon: "Zap",
                title: "Скорость",
                description: "Оптимальные маршруты и быстрая доставка в любую точку"
              },
              {
                icon: "DollarSign",
                title: "Выгодные цены",
                description: "Прозрачное ценообразование без скрытых комиссий"
              },
              {
                icon: "Headphones",
                title: "Поддержка 24/7",
                description: "Круглосуточная диспетчерская служба и онлайн-отслеживание"
              }
            ].map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={advantage.icon} size={40} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-primary-foreground/80">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Александр Петров",
                company: "ООО 'Строймастер'",
                text: "Сотрудничаем уже 3 года. Всегда точно в срок, грузы в целости. Рекомендую!",
                rating: 5
              },
              {
                name: "Елена Сидорова",
                company: "ИП Сидорова Е.В.",
                text: "Отличная компания! Помогли организовать доставку из Китая, все прошло гладко.",
                rating: 5
              },
              {
                name: "Михаил Иванов",
                company: "Торговый дом 'Альфа'",
                text: "Профессиональный подход, адекватные цены. Очень довольны качеством услуг.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Контакты</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Адрес офиса</div>
                    <div className="text-muted-foreground">г. Москва, ул. Транспортная, д. 25, офис 301</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                    <div className="text-muted-foreground">+7 (800) 555-66-77</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">info@spectrans.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Режим работы</div>
                    <div className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</div>
                    <div className="text-muted-foreground">Диспетчерская: 24/7</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">Оставьте заявку</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ваше имя</label>
                      <Input 
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон</label>
                      <Input 
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Сообщение</label>
                      <Textarea 
                        placeholder="Опишите ваш груз и маршрут"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Icon name="Send" size={20} className="mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1A1F2C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
                <span className="text-2xl font-bold">СпецТранс</span>
              </div>
              <p className="text-white/70">
                Надежный партнер в сфере грузоперевозок с 2008 года
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-primary transition-colors">Грузоперевозки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Складская логистика</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Международные перевозки</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Наш автопарк</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/70">
                <li>+7 (495) 123-45-67</li>
                <li>info@spectrans.ru</li>
                <li>г. Москва, ул. Транспортная, 25</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50">
            <p>© 2024 СпецТранс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;