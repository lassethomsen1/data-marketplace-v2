<script>
import {Database} from "lucide-svelte";
</script>

<footer class="bg-gray-800 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div class="flex items-center space-x-2 mb-4">
                    <Database class="h-8 w-8 text-blue-400"/>
                    <span class="text-2xl font-bold">Dataset Marketplace</span>
                </div>
                <p class="text-gray-300 mb-4">
                    The premier marketplace for high-quality datasets. Empowering data-driven decisions worldwide.
                </p>
                <div class="flex space-x-4">
                    <a href="https://twitter.com"
                       class="text-gray-300 hover:text-white transition-colors">Twitter</a>
                    <a href="https://linkedin.com"
                       class="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com" class="text-gray-300 hover:text-white transition-colors">GitHub</a>
                </div>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4">Platform</h3>
                <ul class="space-y-2">
                    <li><a href="/browse" class="text-gray-300 hover:text-white transition-colors">Browse
                        Datasets</a></li>
                    <li><a href="/api" class="text-gray-300 hover:text-white transition-colors">API Access</a></li>
                    <li><a href="/quality" class="text-gray-300 hover:text-white transition-colors">Data Quality</a>
                    </li>
                    <li><a href="/pricing" class="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4">Resources</h3>
                <ul class="space-y-2">
                    <li><a href="/docs" class="text-gray-300 hover:text-white transition-colors">Documentation</a>
                    </li>
                    <li><a href="/tutorials" class="text-gray-300 hover:text-white transition-colors">Tutorials</a>
                    </li>
                    <li><a href="/blog" class="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                    <li><a href="/community" class="text-gray-300 hover:text-white transition-colors">Community</a>
                    </li>
                </ul>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4">Support</h3>
                <ul class="space-y-2">
                    <li><a href="/help" class="text-gray-300 hover:text-white transition-colors">Help Center</a>
                    </li>
                    <li><a href="/contact" class="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                    </li>
                    <li><a href="/privacy" class="text-gray-300 hover:text-white transition-colors">Privacy
                        Policy</a></li>
                    <li><a href="/terms" class="text-gray-300 hover:text-white transition-colors">Terms of
                        Service</a></li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
            <p class="text-gray-300">
                © 2025 Dataset Marketplace. All rights reserved.
            </p>
        </div>
    </div>
</footer>